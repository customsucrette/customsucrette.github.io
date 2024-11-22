function generateCode(version = null) {

    if (version == null) {
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
    } else if (version == "ng") {
        let code = "3i";
        
        code += sucrette.pet.status ? "1T" : "0T";
        code += sucrette.pet.outfit == null ? "0" : (sucrette.pet.outfit).split("-")[0];
        code += "i";

        code += (sucrette.room.background).split("-")[0] + "S";
        code += sucrette.room.slot1 != null ? (sucrette.room.slot1).split("-")[0] + "S" : "0" + "S";
        code += sucrette.room.slot2 != null ? (sucrette.room.slot2).split("-")[0] + "S" : "0" + "S";
        code += sucrette.room.slot3 != null ? (sucrette.room.slot3).split("-")[0] + "S" : "0" + "S";
        code += sucrette.room.slot4 != null ? (sucrette.room.slot4).split("-")[0] + "S" : "0" + "S";
        code += sucrette.room.slot5 != null ? (sucrette.room.slot5).split("-")[0] : "0";

        for (z = 0; z < sucrette.orderInfo.length; z++) {
            code += "i";

            switch(sucrette.orderInfo[z].category) {
                case "avatar":
                    let s = sucrette.avatar.skin[0].toUpperCase();
                    let cs = sucrette.avatar.customSkin != null ? (sucrette.avatar.customSkin).split("-")[0] : "";
                    let hc = $(`.hair-color .color[data-color=${sucrette.avatar.hair}]`).index();
                    let ec = $(`.eye-color .color[data-color=${sucrette.avatar.eyesColor}]`).index();
                    let e = (sucrette.avatar.eyes).split("-")[0];
                    let eb = (sucrette.avatar.eyebrows).split("-")[0];
                    let m = (sucrette.avatar.mouth).split("-")[0];
                    let xb = avatar.expressions.eyebrow.findIndex(v => v == sucrette.avatar.expression.eyebrow);
                    let xe = avatar.expressions.eye.findIndex(v => v == sucrette.avatar.expression.eye);
                    let xm = avatar.expressions.mouth.findIndex(v => v == sucrette.avatar.expression.mouth);

                    code += `${s}${cs}A${hc}A${ec}A${e}A${eb}A${m}A${xb}X${xe}X${xm}`;
                    break;

                case "hair":
                    code += (sucrette.orderInfo[z].layer[0]).toUpperCase() + "H";
                    break;

                default:
                    code += sucrette.orderInfo[z].layer == null ? "M" : (sucrette.orderInfo[z].layer[0]).toUpperCase();
                    code += (sucrette.orderInfo[z].value).split("-")[0];
            };
        };

        return code;

    };
};

function drawPopUpCode(code) {
    if (!(window.location.href).includes("/ng/")) {
        $("body").append('<div class="overlay-container"></div>');
    } else {
        $("#overlay-popup").append('<div class="overlay-container"></div>');
    }

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

    if (!(window.location.href).includes("/ng/")) {
        var currentButton = $(".copy-code").text();
        if (currentButton == "Copiar código") {
            $(".copy-code").text("¡Se ha copiado el código!");
            $(".copy-code").addClass("active");
        };
    };
};

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

        } else if (code[0] == 3) {
            if (!url.includes("/ng/wardrobe")) {
                localStorage.setItem("tempCode", code);
                window.location.href = "../ng/wardrobe.html";
            } else {
                loadCode(code);
                codeUpdate();
            };

        } else {
            alert("El código no es correcto.");
        };
    };
}

function checkAndGetTempCode() {
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

        } else if (code[0] == 3) {
            if (!url.includes("/ng/wardrobe")) {
                window.location.href = "../ng/wardrobe.html";
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
};

function loadCode(code = null) {
    if (code == null) {
        code = $(".code-input input").val();
    };

    if (code[0] != 3) {

        // Comprobar compatibilidad de version
        var data = code.split("i");
        var result = true;

        var searchValue = "";
        var tempData = "";
        try {

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

        } catch (e) {
            alert("El código no es correcto.");
            $(".code-input input").val("");
        };

    } else if (code[0] == 3) {
        $(".code-input input").val("");
        try {
            code = code.split("i");
            // 0 / 1 / 2 == ver / taki / room
            let cPet = code[1].split("T");
            sucrette.pet.status = cPet[0] == 1 ? true : false;
            if (cPet[1] == 0) {
                sucrette.pet.outfit = null;
            } else {
                let p = pet.filter(v => v.id == cPet[1]);
                sucrette.pet.outfit = `${cPet[1]}-${p[0].security}`;
            };

            let cRoom = code[2].split("S");
            const bg = room.filter(v => {return v.id == cRoom[0]});
            sucrette.room.background = bg.length == 1 ? `${cRoom[0]}-${bg[0].security}` : null;
            const slot1 = room.filter(v => {return v.id == cRoom[1]});
            sucrette.room.slot1 = slot1.length == 1 ? `${cRoom[1]}-${slot1[0].security}` : null;
            const slot2 = room.filter(v => {return v.id == cRoom[2]});
            sucrette.room.slot2 = slot2.length == 1 ? `${cRoom[2]}-${slot2[0].security}` : null;
            const slot3 = room.filter(v => {return v.id == cRoom[3]});
            sucrette.room.slot3 = slot3.length == 1 ? `${cRoom[3]}-${slot3[0].security}` : null;
            const slot4 = room.filter(v => {return v.id == cRoom[4]});
            sucrette.room.slot4 = slot4.length == 1 ? `${cRoom[4]}-${slot4[0].security}` : null;
            const slot5 = room.filter(v => {return v.id == cRoom[5]});
            sucrette.room.slot5 = slot5.length == 1 ? `${cRoom[5]}-${slot5[0].security}` : null;

            code.splice(0,3);

            sucrette.orderInfo.length = 0; // Clean current sucrette

            for(z = 0; z < code.length; z++) {
                if (code[z].includes("A")) {

                    let tAvatar = code[z].split("A");
                    
                    switch ((tAvatar[0])[0]) {
                        case "R": sucrette.avatar.skin = "rose"; break;
                        case "T": sucrette.avatar.skin = "tulip"; break;
                        case "M": sucrette.avatar.skin = "marigold"; break;
                        case "H": sucrette.avatar.skin = "hortensia"; break;
                        case "O": sucrette.avatar.skin = "orchid"; break;
                        case "L": sucrette.avatar.skin = "lys"; break;
                        case "P": sucrette.avatar.skin = "pansy"; break;
                    }; 
                    
                    // custom skin
                    if (tAvatar[0].length > 1) {
                        let cs = (tAvatar[0]).slice(1);
                        let temp = cloth.filter(v => v.variations.some(i => i.id == cs));
                        sucrette.avatar.customSkin = `${cs}-${temp[0].security}`;
                    } else {
                        sucrette.avatar.customSkin = null;
                    };

                    sucrette.avatar.hair = $(".hair-color .color").eq(tAvatar[1]).data("color");
                    sucrette.avatar.eyesColor = $(".eye-color .color").eq(tAvatar[2]).data("color");
                    let temp = (avatar.collections.eyes).filter(v => v.variations.some(i => i.id == tAvatar[3])); // test
                    sucrette.avatar.eyes = `${tAvatar[3]}-${temp[0].security}`;
                    temp = (avatar.collections.eyebrows).filter(v => v.variations.some(i => i.id == tAvatar[4])); // test
                    sucrette.avatar.eyebrows = `${tAvatar[4]}-${temp[0].security}`;
                    temp = (avatar.collections.mouth).filter(v => v.variations.some(i => i.id == tAvatar[5])); // test
                    sucrette.avatar.mouth = `${tAvatar[5]}-${temp[0].security}`;

                    let tExpr = tAvatar[6].split("X");
                    sucrette.avatar.expressionPreset = "auto";
                    sucrette.avatar.expression.eyebrow = avatar.expressions.eyebrow[tExpr[0]];
                    sucrette.avatar.expression.eye = avatar.expressions.eye[tExpr[1]];
                    sucrette.avatar.expression.mouth = avatar.expressions.mouth[tExpr[2]];

                    sucrette.orderInfo.push({"category":"avatar", "layer":null, "value":null});

                } else {
                    let id = code[z].slice(1);
                    let layer = code[z].slice(0,1);
                    layer = layer == "M" ? null : layer == "B" ? "back" : "front";

                    let c = "", uID = "";
                    if (id != "H") {
                        let item = cloth.filter(v => v.variations.some(i => i.id == id)); // test
                        uID = `${id}-${item[0].security}`;
                        c = item[0].category;
                    } else {
                        c = "hair";
                        uID = "auto";
                    };

                    sucrette.orderInfo.push({"category":c, "layer":layer, "value":uID});
                };
            };

        } catch(e) {
            alert("El código no es correcto.");
        }; 
    };

};

// Formato del código >>>
// v-skin-cskin-hs-hc-eb-et-ec-m-mu-codigos

// Pruebas
// 2i504iNOi506i520i531i566i532i621i629i26945i32586i29073i32504i30389i32444
// 1i103iNOi43i81i1i76i85i23i14i74i7879i8414i25808i7653i7465i7922i7317i5545
// 2i501iNOi567i530i565i560i542i657iNOi32257i30027i27721i32300i32375i31288i23164i28186i28421i31378i25478i22910i32444i23071
// 3i1T1i38S31S157S0S52S0iB2341iRA1A6A2A3A1A0X2X8iM1iM637iM618iM627iF2341iM3521

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

});