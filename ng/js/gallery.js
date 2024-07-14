$(document).ready(() => {
    customTheme();
    userSettings();
    currentPage("gallery");
    $("#filter-version").val("NG");
    loadPosts();
});

const postsPerPage = 32;

const loadPosts = (page = 0, num = postsPerPage) => {
    // Obtener filtro
    let ver = $("#filter-version option:selected").val();

    let tags = ver == "all" ? `tagged=submission` : `tagged=${ver}`;
    let param = `?start=${page*num}&num=${num}&${tags}`;

    (() => {
        $("#dynamic-script").html("");
        $(".cs-gallery-content").html("");
        let script = document.createElement("script");

        script.onload = () => {

            let tumblr_posts = tumblr_api_read.posts;

            if (tumblr_posts.length > 0) {

                for (p = 0; p < tumblr_posts.length; p++) {
                    $(".cs-gallery-content").append('<div class="post-container"><div class="post-content"><div class="author-info"></div></div></div>');

                    if (tumblr_posts[p]["is-submission"]) {
                        // Submited post
                        $(".post-content").eq(p).append(`<img src="${tumblr_posts[p]["photo-url-1280"]}">`);
                        if (tumblr_posts[p].submitter != "Anónimo" && tumblr_posts[p].submitter != "Anonymous") {
                            $(".author-info").eq(p).append(`enviado por <a href="https://${tumblr_posts[p].submitter}.tumblr.com" target="_blank">@${tumblr_posts[p].submitter}</a>`);
                        } else {
                            $(".author-info").eq(p).append(`enviado por anónimo`);
                        };

                        // search code
                        let code = searchCodeInCaption(tumblr_api_read.posts[p]["photo-caption"]);
                        if (code != null) {
                            $(".post-content").eq(p).append(`<div class="post-found-code" data-code="${code}" title="Abrir en el vestidor"><span class="material-symbols-outlined">link</span></div>`);
                        };

                        // Caption
                        let caption = (tumblr_api_read.posts[p]["photo-caption"]).replace(/\n/g,"@#@#@#@#@");
                        if (caption != "") {
                            let message = "";

                            if (caption.includes("@#@#@#@#@")) {
                                let fragment = caption.split("@#@#@#@#@");
                                for (f = 0; f < fragment.length; f++) {
                                    let isCode = searchCodeInCaption(fragment[f]);
                                    let noHTML = $(fragment[f]).text();
                                    if ((isCode == null || isCode == "") && noHTML != "") {
                                        message += `<p>${fragment[f]}</p>`;
                                    };
                                };

                            } else {
                                let isCode = searchCodeInCaption(caption);
                                let noHTML = $(caption).text();
                                if ((isCode == null || isCode == "") && noHTML != "") {
                                    message += `<p>${caption}</p>`;
                                };

                            };

                            if (message != "") {
                                $(".post-content").eq(p).append(`<div class="author-message hidden">${message}</div>`);
                                $(".post-content").eq(p).append('<div class="post-found-message"><span class="material-symbols-outlined">chat</span></div>');
                            };
                        };
                        
                    } else {
                        // Reblogged post 
    
                        // let reblog = $(tumblr_posts[p]["regular-body"]).find("img").eq(0).attr("srcset").split(", ");
                        // let image = reblog[reblog.length - 1];
                        // $(".post-content").eq(p).append(`<img src="${image.split(" ")[0]}">`);
                        // $(".author-info").eq(p).append(`repost de <a href="${tumblr_posts[p]["reblogged-root-url"]}" target="_blank">@${tumblr_posts[p]["reblogged-root-name"]}</a>`);
                    };

                    // Si es portrait o landscape
                    isPortrait = tumblr_posts[p].tags.filter(v => v == "portrait");
                    $(".post-container").eq(p).addClass(isPortrait.length == 1 ? "portrait" : "landscape" );
                };

            } else {
                $(".cs-gallery-content").append('<div class="empty-gallery">No hay elementos disponibles.</div>');
            };

            updatePagination();

        };

        script.src = `https://custom-gallery.tumblr.com/api/read/json${param}`;
        document.getElementById("dynamic-script").appendChild( script );

    })();


};

const showFullImage = (img) => {
    $("#image-layout img").remove();
    $("#image-layout").append(`<img src="${img}">`);
    $("#image-layout").css("display", "flex");
    $("#image-layout").scrollTop(0);
};

const searchCodeInCaption = (caption) => {

    // Comprobar si tiene código
    if (caption.includes("1i") || caption.includes("2i") || caption.includes("3i")) {

        // Buscar versión e inicio del código 
        caption = caption.replace(/</g, "---");
        caption = caption.replace(/>/g, "---");
        caption = caption.replace(/ /g, "---");
        caption = caption.split("---");

        let code = null;
        for (c = 0; c < caption.length; c++) {
            if (caption[c].includes("1i") || caption[c].includes("2i") || caption[c].includes("3i")) {
                code = caption[c].trim();

                let v1 = (code.indexOf("1i") < 0) ? 999999 : code.indexOf("1i");
                let v2 = (code.indexOf("2i") < 0) ? 999999 : code.indexOf("2i");
                let v3 = (code.indexOf("3i") < 0) ? 999999 : code.indexOf("3i");

                if (v1 < v2 && v1 < v3) {
                    // Es V1
                    code = code.slice(v1);
                } else if (v2 < v1 && v2 < v3) {
                    // Es V2
                    code = code.slice(v2);
                } else if (v3 < v1 && v3 < v2) {
                    // Es V3
                    code = code.slice(v3);
                } else {
                    return null;
                };
                
                break;
            };
        };

        // Buscar final del código 
        for (e = (code.length - 1); e > 0; e--) {
            if (!isNaN(parseInt(code[e]))) {
                code = code.slice(0,(e + 1));
                return code;
            };
        };
        // console.log("No se pudo encontrar el código");
        return null;

    } else {
        // console.log("No contiene códigos");
        return null;
    };
};

const updatePagination = () => {

    // Bloquear pagina anterior ? 
    let currentPage = parseInt( $("#page-info").attr("data-current") );
    (currentPage == 0) ? $("#page-back").addClass("disabled") : $("#page-back").removeClass("disabled");


    // Bloquear pagina siguiente ?
    let totalPosts = parseInt( tumblr_api_read["posts-total"] );
    let totalPostsPerPage = postsPerPage;
    let initialPost = totalPostsPerPage * currentPage;
    let nextInitialPost = initialPost + totalPostsPerPage;

    (totalPosts <= nextInitialPost) ? $("#page-next").addClass("disabled") : $("#page-next").removeClass("disabled");
    (totalPosts <= totalPostsPerPage) ? $(".pagination").hide() : $(".pagination").show();

};


$(function() {
    $("#filter-version").change(function() {
        $("#page-info").attr("data-current", 0);
        $("#page-info").text(1);
        loadPosts();
    });

    $(".button-gallery-popup").click(function() {
        $("#wip-layout").fadeOut(200);
    });

    $(".cs-gallery-content").on("click", ".post-content img", function() {
        let img = $(this).attr("src");
        showFullImage(img);
    });

    $(".cs-gallery-content").on("click", ".post-found-message", function() {
        let clase = $(this).parent().find(".author-message").attr("class")
        if (clase.includes("hidden")) {
            $(this).parent().find(".author-message").removeClass("hidden");
        } else {
            $(this).parent().find(".author-message").addClass("hidden");
        };
    });

    $(".cs-gallery-content").on("click", ".post-found-code", function() {
        let code = $(this).attr("data-code");
        localStorage.setItem("tempCode", code);
        let v = code[0] != 3 ? `v${code[0]}` : "ng";
        window.open(`../${v}/wardrobe.html`, "_blank");
    });

    $("#image-layout").click(function() {
        $(this).fadeOut(100);
    });
    
    $(".page").click(function() {
        let page = parseInt( $("#page-info").attr("data-current") );
        let goto = $(this).attr("id").split("-")[1];
        (goto == "back") ? page-- : page++;
        
        $("#page-info").attr("data-current", page);
        $("#page-info").text(page + 1);
        loadPosts(page);
    });

});