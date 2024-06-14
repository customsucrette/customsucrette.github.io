$(document).ready(() => {
    customTheme();
    userSettings();
    currentPage("gallery");
    loadPosts();
});

const loadPosts = (start = 0, num = 30) => {
    // Obtener filtro
    let ver = $("#filter-version option:selected").val();

    let tags = ver == "all" ? `tagged=submission` : `tagged=${ver}`;
    let param = `?start=${start}&num=${num}&${tags}`;

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
                        if (tumblr_posts[p].submitter != "Anónimo") {
                            $(".author-info").eq(p).append(`enviado por <a href="https://${tumblr_posts[p].submitter}.tumblr.com" target="_blank">@${tumblr_posts[p].submitter}</a>`);
                        } else {
                            $(".author-info").eq(p).append(`enviado por ${tumblr_posts[p].submitter}`);
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

        };

        script.src = `https://custom-gallery.tumblr.com/api/read/json${param}`;
        document.getElementById("dynamic-script").appendChild( script );

    })();

};

const orientacion = (w, h) => {
    if (w <= h) {
        return 'portrait';
        
    } else if (w > h) {
        return 'landscape';
    };
};

const showFullImage = (img) => {
    $("#image-layout img").remove();
    $("#image-layout").append(`<img src="${img}">`);
    $("#image-layout").css("display", "flex");
    $("#image-layout").scrollTop(0);
};


$(function() {
    $("#filter-version").change(function() {
        loadPosts();
    });

    $(".button-gallery-popup").click(function() {
        $("#wip-layout").fadeOut(200);
    });

    $(".cs-gallery-content").on("click", ".post-content img", function() {
        let img = $(this).attr("src");
        showFullImage(img);
    });

    $("#image-layout").click(function() {
        $(this).fadeOut(100);
    });

});