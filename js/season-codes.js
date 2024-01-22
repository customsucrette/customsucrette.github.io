function checkBar() {
    var search = window.location.search;

    if (search != "") {
        var code = search.replace("?q=", "");

        if (code[0] == 1) {
            if ((window.location.href).includes("/v2/")) {
                changeVer("v1", code);
            } else {
                // Cargar código!
                history.replaceState(null, "", "wardrobe.html");
                loadCode(code);
            };
        } else if (code[0] == 2) {
            if ((window.location.href).includes("/v1/")) {
                changeVer("v2", code);
            } else {
                // Cargar código!
                history.replaceState(null, "", "wardrobe.html");
                loadCode(code);
            };
        };
    };
};

function generateCode() {

    var code = "1i"; // version
    if ((window.location.href).includes("v2")) {
        code = "2i";
    }
    
    // AVATAR
    var av = customSucrette.avatar;

    var num = av.skin.split("-");
    code += num[0] + "i"; // skin

    num = av.customSkin;
    if (num != null) {
        num = num.split("-");
        code += num[0].replace("https://assets3.corazondemelon.es/clothe/web/thumb_MD/", "") + "i";
    } else {
        code += "NOi";
    }

    num = av.hairStyle;
    num = num.split("-");
    code += num[0] + "i";

    num = av.hairColor;
    num = num.split("-");
    code += num[0] + "i";

    num = av.eyebrow;
    num = num.split("-");
    code += num[0] + "i";

    num = av.eyeType;
    num = num.split("-");
    code += num[0] + "i";

    num = av.eyeColor;
    num = num.split("-");
    code += num[0] + "i";

    num = av.mouth;
    num = num.split("-");
    code += num[0] + "i";

    num = av.makeUp;
    if (num != null) {
        num = num.split("-");
        code += num[0] + "i";
    } else {
        code += "NOi";
    }

    // heelsOn ? code += "1i" : code += "0i";

    // ROPA
    var cl = customSucrette.clothe;
    for (c = 0; c < cl.length; c++) {
        if (c > 0) { code += "i" };

        num = cl[c].src;
        num = num.split("-")
        code += num[0].replace("https://assets3.corazondemelon.es/clothe/web/thumb_MD/", "");
    };

    return code;
}

function drawPopUpCode(code) {

    $("body").append('<div class="overlay-container"></div>');
    $(".overlay-container").append('<div class="overlay-popup code-popup"><div class="button-close"><span class="fa fa-times"></span></div></div>');
    $(".overlay-popup").append('<div id="code-panel"></div>');
    $("#code-panel").append('<div class="title">¡Se ha generado tu código!</div>');
    $("#code-panel").append('<p>Utiliza este código para volver a cargar a tu Sucrette más tarde: </p>');
    $("#code-panel").append('<textarea readonly class="code-container"></textarea>');
    $(".code-container").val(code);
    $("#code-panel").append('<div class="copy-code">Copiar código</div>');

    $("html").css("overflow", "hidden");
};

function copyCode() {
  var copyText = document.getElementsByClassName("code-container")[0];

  copyText.select();
  copyText.setSelectionRange(0, 99999); /* moviles */

  navigator.clipboard.writeText(copyText.value);

  var currentButton = $(".copy-code").text();
  if (currentButton == "Copiar código") {
      $(".copy-code").text("¡Se ha copiado el código!");
      $(".copy-code").addClass("active");
  };

} 

function saveTempCode() {
    var code = $(".code-input input").val();
    var url = window.location.href;
    if (code != null && code != "" && code != undefined && code != "undefined") {

        // Cambiar de página si es necesario
        if (code[0] == 1) {
            if (!url.includes("/v1/wardrobe")) {
                localStorage.setItem("tempCode", code);
                window.location.href = "../v1/wardrobe.html";
            } else {
                loadCode(code);
            };
    
        } else if (code[0] == 2) {
            if (!url.includes("/v2/wardrobe")) {
                localStorage.setItem("tempCode", code);
                window.location.href = "../v2/wardrobe.html";
            } else {
                loadCode(code);
            };
    
        } else {
            alert("El código no es correcto.");
        };
    };
}

function checkAndGetTempCode () {
    var code = localStorage.getItem("tempCode");
    var url = window.location.href;

    if (code != null && code != "" && code != undefined && code != "undefined") {

        if (code[0] == 1) {
            if (!url.includes("/v1/wardrobe")) {
                window.location.href = "../v1/wardrobe.html";
            } else {
                localStorage.removeItem("tempCode");
                loadCode(code);
                return true;
            };
    
        } else if (code[0] == 2) {
            if (!url.includes("/v2/wardrobe")) {
                window.location.href = "../v2/wardrobe.html";
            } else {
                localStorage.removeItem("tempCode");
                loadCode(code);
                return true;
            };
    
        } else {
            alert("El código no es correcto.");
        };

        return false;
    };

    

}

function loadCode(code = null) {
    if (code == null) {
        code = $(".code-input input").val();
    };

    // Comprobar compatibilidad de version
    var data = code.split("i");
    var result = true;

    if ((window.location.href).includes("/v1/")) {
        if (data[0] != 1) { result = changeVer("v2", code) };

    } else if ((window.location.href).includes("/v2/")) {
        if (data[0] != 2) { result = changeVer("v1", code) };
    };

    var searchValue = "";
    var tempData = "";
    try {

        if (result) {
            $(".code-input input").val("");

            // AVATAR SKIN
            if ((window.location.href).includes("/v2/")) {
                tempData = data[1] + "-";
                searchValue = avatar[7].skinColor.filter(v => {return v.id.includes(tempData)});
                customSucrette.avatar.skin = searchValue[0].id;
            } else {
                customSucrette.avatar.skin = "103-f95bf0dc4ab32d9d";
            };


            // CUSTOM SKIN
            if (data[2] == "NO") {
                customSucrette.avatar.customSkin = null;
                if ((window.location.href).includes("/v2/")) {
                    customSucrette.avatar.tempSkinColor = null;
                };
            } else {
                tempData = "/" + data[2] + "-";
                searchValue = clothe.filter(v => {return v.src.includes(tempData)});
                customSucrette.avatar.customSkin = searchValue[0].src;

                if ((window.location.href).includes("/v2/")) {
                    if (customSucrette.avatar.customSkin != null) {
                        var tempSkin = searchValue[0].skinValue;
                        if (tempSkin == 0) {
                            customSucrette.avatar.tempSkinColor = "no";
                        } else {
                            var temp = avatar[7].skinColor.filter(v => {return v.value == tempSkin});
                            customSucrette.avatar.tempSkinColor = temp[0].id;
                        };
                    };
                };
            };

            // ESTILO DE CABELLO
            tempData = data[3] + "-";
            searchValue = avatar[0].hairStyle.filter(v => {return v.id.includes(tempData)});
            customSucrette.avatar.hairStyle = searchValue[0].id;

            // COLOR DE CABELLO
            tempData = data[4] + "-";
            searchValue = avatar[2].hairColor.filter(v => {return v.id.includes(tempData)});
            customSucrette.avatar.hairColor = searchValue[0].id;

            // CEJAS
            tempData = data[5] + "-";
            searchValue = avatar[1].eyebrow.filter(v => {return v.id.includes(tempData)});
            customSucrette.avatar.eyebrow = searchValue[0].id;

            // TIPO DE OJOS
            tempData = data[6] + "-";
            searchValue = avatar[3].eyeType.filter(v => {return v.id.includes(tempData)});
            customSucrette.avatar.eyeType = searchValue[0].id;

            // COLOR DE OJOS
            tempData = data[7] + "-";
            searchValue = avatar[4].eyeColor.filter(v => {return v.id.includes(tempData)});
            customSucrette.avatar.eyeColor = searchValue[0].id;

            // BOCA
            tempData = data[8] + "-";
            searchValue = avatar[5].mouth.filter(v => {return v.id.includes(tempData)});
            customSucrette.avatar.mouth = searchValue[0].id;

            // MAQUILLAJE
            if (data[9] != "NO") {
                tempData = data[9] + "-";
                searchValue = avatar[6].makeUp.filter(v => {return v.id.includes(tempData)});
                customSucrette.avatar.makeUp = searchValue[0].id;
            } else {
                customSucrette.avatar.makeUp = null;
            };

            customSucrette.clothe.length = 0;

            for (c = 10; c < data.length; c++) {
                tempData = "/" + data[c] + "-";
                searchValue = clothe.filter(v => {return v.src.includes(tempData)});

                var categoria = info.filter(v => {return v.groupId == searchValue[0].groupId});
                categoria = categoria[0].category;

                if ((window.location.href).includes("/v1/")) {
                    if (categoria == "highHeels") heelsOn = true;
                    if (categoria == "shoes") heelsOn = false;
                };
                var texto = '{"category":"' + categoria + '", "src":"' + searchValue[0].src + '"}';

                customSucrette.clothe.push(JSON.parse(texto));
            };

            var canvas = $("canvas").attr("height");
            if (canvas == "535") {
                drawSucrette("face");
            } else {
                drawSucrette();
            };

            drawPanel();

        };
    } catch (e) {
        alert("El código no es correcto.");
        $(".code-input input").val("");
    };
};

function changeVer(newver, code) {
    alert("Este código no corresponde a esta temporada.");
    $(".code-input form input").val("");
    return false;
};

// Formato del código >>>
// v-skin-cskin-hs-hc-eb-et-ec-m-mu-codigos

// Pruebas
// 2i504iNOi506i520i531i566i532i621i629i26945i32586i29073i32504i30389i32444
// 1i103iNOi43i81i1i76i85i23i14i74i7879i8414i25808i7653i7465i7922i7317i5545
// 2i501iNOi567i530i565i560i542i657iNOi32257i30027i27721i32300i32375i31288i23164i28186i28421i31378i25478i22910i32444i23071

$(function (){
    
    $("body").on("click", ".copy-code", function(){
        copyCode();
    });

    // Menu 
    $("season-selector").on("mouseenter", "season-selector-button", function() {
        $(this).addClass("on-hover");
        $(".current-season .text").removeClass("visible");
        $(this).find(".text").addClass("visible");

        var clase = $(this).attr("class");
        if (!clase.includes("current-season")) {
            $(this).find(".switch").addClass("rotate");
        };
    });

    $("season-selector").on("mouseleave", "season-selector-button", function() {
        $(this).removeClass("on-hover");
        $(this).find(".text").removeClass("visible");
        
        var clase = $(this).attr("class");
        if (!clase.includes("current-season")) {
            $(this).find(".switch").removeClass("rotate");
        };

        $(".current-season .text").addClass("visible");
    });
    
})

