// VARIABLES GLOBALES

var customSucrette = {
    "avatar":{
        "skin":"501-7339a780ecce8c7e", 
        "customSkin":null, "tempSkinColor":null,
        "hairStyle":"506-42c3eae1e3af7dcc",
        "hairColor":"522-78719c44b0bfff11", 
        "eyebrow":"531-85673e28df89ba2e", 
        "eyeType":"549-c6dac6b324ac943a", 
        "eyeColor":"535-4c92eb79e57bc9fe", 
        "mouth":"547-42860e0e8a07cdaf", 
        "makeUp":null
    },
    "clothe":[
        {"category":"underwears", "src":"https://assets3.corazondemelon.es/clothe/web/thumb_MD/26945-481424920922e911.png"}
    ],
    "maxCategory":[
        {"category":"wig", "max":1, "type":"replace"},
        {"category":"underwears", "max":1, "type":"replace"},
        {"category":"skin", "max":1, "type":"replace"},
        {"category":"Dress", "max":1, "type":"replace"},

        {"category":"shoes", "max":1, "type":"replace"},

        {"category":"purse", "max":2, "type":"block"},
        {"category":"jacket", "max":2, "type":"block"},

        {"category":"shirt", "max":3, "type":"block"},
        {"category":"pants", "max":3, "type":"block"},

        {"category":"hairAccessory", "max":5, "type":"block"},
        {"category":"socks", "max":5, "type":"block"},
        {"category":"necklace", "max":5, "type":"block"},

        {"category":"accessory", "max":20, "type":"block"}
]};


var avatar = [], info = [], clothe = [];
const requestAvatar = new XMLHttpRequest();requestAvatar.open("GET", "../data/v2/avatar.json");
requestAvatar.responseType = "json";requestAvatar.send();requestAvatar.onload = function() {

    const requestInfo = new XMLHttpRequest();requestInfo.open("GET", "../data/v2/info.json");
    requestInfo.responseType = "json";requestInfo.send();requestInfo.onload = function() {

        const requestClothe = new XMLHttpRequest();requestClothe.open("GET", "../data/v2/clothe.json");
        requestClothe.responseType = "json";requestClothe.send();requestClothe.onload = function() {
                
            info = requestInfo.response; 
            clothe = requestClothe.response; 
            avatar = requestAvatar.response;

            $(".search input").val("");
            cargarAvatar();
            if (!checkAndGetTempCode()) {
                drawSucrette("face");
                drawPanel();
            };
        };
    };
};

function preloadIMG(src) {
    return new Promise(resolve => {
        var img = new Image();
        img.src = src;
        img.onload = () => {resolve(img)}; 
    });
};

function cargarRopa(pag = 0, subGroup = null, pagsub = 0) {
    $(".showcase").html("");

    var input = $(".search input").val();
    var categoria, grupos;

    if (input == "") {
        categoria = categoriaSeleccionada();
        grupos = info.filter(v => {return v.category == categoria});
    } else {
        var input = normalize(input).toLowerCase();
        grupos = info.filter(function(v){return (normalize(v.name).toLowerCase()).includes(input)});
    };

    grupos.reverse();

    var elmntLooper = 0;

    // Calcular según tamaño de items
    var maxElements = 8;
    var size = $(".size-button.actif").attr("class");
    if (size.includes("little")) {
        size = "little";
        maxElements = 21;
    } else {size = "big"};

    if (subGroup == null) {

        for (a = pag * maxElements; a < grupos.length; a++) {
            $(".showcase").append('<div class="declinable-hanger" data-category="' + grupos[a].category + '"><div class="hanger-container"></div></div>');
            var leader = clothe.filter(v => {return v.groupId == grupos[a].groupId});

            if (leader.length > 1) {
                // Etiqueta de Mostrar más colores
                if (size == "little") {
                    $(".hanger-container").eq(elmntLooper).append('<div class="hanger clickable little"><div class="item"><img></div></div>');
                } else {
                    $(".hanger-container").eq(elmntLooper).append('<div class="hanger clickable"><div class="item"><img></div></div>');
                }
                $(".declinable-hanger").eq(elmntLooper).attr("data-groupid", grupos[a].groupId);
                $(".hanger.clickable").eq(elmntLooper).append('<div class="declinations"><div class="panel"><div class="counter"><div class="declination-picto"></div><div> 1/' + leader.length + ' </div></div><div class="text"><div class="text-content"><p><span>Ver todos los colores</span></p></div></div></div></div>');
            } else {
                var seleccionado = customSucrette.clothe.filter(v => {return v.src == leader[0].src});
                var cSkin = customSucrette.avatar.customSkin;

                if (seleccionado.length > 0 || (cSkin == leader[0].src)) {
                    if (size == "little") {
                        $(".hanger-container").eq(elmntLooper).append('<div class="hanger clickable selected little"><div class="item"><img></div></div>');
                    } else {
                        $(".hanger-container").eq(elmntLooper).append('<div class="hanger clickable selected"><div class="item"><img></div></div>');
                    }
                } else {
                    if (size == "little") {
                        $(".hanger-container").eq(elmntLooper).append('<div class="hanger clickable little"><div class="item"><img></div></div>');
                    } else {
                        $(".hanger-container").eq(elmntLooper).append('<div class="hanger clickable"><div class="item"><img></div></div>');
                    }
                };
            };

            $(".item img").eq(elmntLooper).attr("src", leader[0].src);
            $(".item img").eq(elmntLooper).attr("title", grupos[a].name);

            elmntLooper++;
            if (elmntLooper == maxElements) break;
        };

        // Paginacion
        var paginas = Math.ceil(grupos.length / maxElements);
        pagination(paginas, pag);
       
    } else {
        // Cargar variaciones
        $(".showcase").attr("data-groupid", subGroup);
        var variacion = clothe.filter(v => {return v.groupId == subGroup});
        var nombre = info.filter(v => {return v.groupId == subGroup});

        for (a = pagsub * maxElements; a < variacion.length; a++) {
            
            $(".showcase").append('<div class="declinable-hanger" data-category="' + nombre[0].category + '"><div class="hanger-container"></div></div>');

            var seleccionado = customSucrette.clothe.filter(v => {return v.src == variacion[a].src});
            var cSkin = customSucrette.avatar.customSkin;

            if (seleccionado.length > 0 || (cSkin == variacion[a].src)) {
                if (size == "little") {
                    $(".hanger-container").eq(elmntLooper).append('<div class="hanger clickable selected little"><div class="item"><img></div></div>');
                } else {
                    $(".hanger-container").eq(elmntLooper).append('<div class="hanger clickable selected"><div class="item"><img></div></div>');
                }
            } else {
                if (size == "little") {
                    $(".hanger-container").eq(elmntLooper).append('<div class="hanger clickable little"><div class="item"><img></div></div>');
                } else {
                    $(".hanger-container").eq(elmntLooper).append('<div class="hanger clickable"><div class="item"><img></div></div>');
                }
            };

            $(".item img").eq(elmntLooper).attr("src", variacion[a].src);
            $(".item img").eq(elmntLooper).attr("title", nombre[0].name);

            elmntLooper++;
            if (elmntLooper == maxElements) break;
        };

        // Paginacion
        var paginas = Math.ceil(variacion.length / maxElements);
        pagination(paginas, pagsub);
    };
};

function cargarAvatar(page = 0) {
    $(".showcase").html("");

    var categoria = categoriaSeleccionada();
    var base = "";

    if (categoria == "hairStyle") {base = avatar[0].hairStyle;
    } else if (categoria == "hairColor") {base = avatar[2].hairColor;
    } else if (categoria == "eyeType") {base = avatar[3].eyeType;
    } else if (categoria == "eyeColor") {base = avatar[4].eyeColor;
    } else if (categoria == "eyebrow") {base = avatar[1].eyebrow;
    } else if (categoria == "mouth") {base = avatar[5].mouth;
    } else if (categoria == "makeUp") {base = avatar[6].makeUp;
    } else if (categoria == "skinColor") {base = avatar[7].skinColor;
    };

    var elmntLooper = 0;
    
    for (b = page * 8; b < base.length; b++) {
        $(".showcase").append('<div class="declinable-avatar" data-category="' + categoria + '"><div class="hanger-container"></div></div>');

        var url = "https://assets3.corazondemelon.es/avatarpart/web/thumb_MD/";
        var selected = "";

        if (categoria == "hairStyle") {
            url += base[b].id + "_" + customSucrette.avatar.hairColor + ".png";
            if (customSucrette.avatar.hairStyle == base[b].id) selected = "selected";

        } else if (categoria == "hairColor") {
            url += customSucrette.avatar.hairStyle + "_" + base[b].id + ".png";
            if (customSucrette.avatar.hairColor == base[b].id) selected = "selected";

        } else if (categoria == "eyeType") {
            url += base[b].id + "_" + customSucrette.avatar.eyeColor + "_no.png";
            if (customSucrette.avatar.eyeType == base[b].id) selected = "selected";

        } else if (categoria == "eyeColor") {
            url += customSucrette.avatar.eyeType + "_" + base[b].id + "_no.png";
            if (customSucrette.avatar.eyeColor == base[b].id) selected = "selected";

        } else if (categoria == "eyebrow") {
            url += base[b].id + "_" + customSucrette.avatar.hairColor + ".png";
            if (customSucrette.avatar.eyebrow == base[b].id) selected = "selected";

        } else if (categoria == "mouth") {
            url += base[b].id + "_no.png";
            if (customSucrette.avatar.mouth == base[b].id) selected = "selected";

        } else {
            url += base[b].id + ".png";
            if (customSucrette.avatar.makeUp == base[b].id) selected = "selected";
            if (customSucrette.avatar.skin == base[b].id) selected = "selected";
        }; 

        $(".hanger-container").eq(elmntLooper).append('<div class="hanger clickable ' + selected + '"><div class="item"><img></div></div>');
        $(".item img").eq(elmntLooper).attr("src", url);

        elmntLooper++;
        if (elmntLooper == 8) break;
    };

    var paginas = Math.ceil(base.length / 8);
    pagination(paginas, page);
}

async function drawSucrette(size = "body") {

    var attr = "";

    // -------------------------------------------------

    if (size == "small") {
        attr = 'width="410" height="700"';
    } else if (size == "medium") {
        attr = 'width="656" height="1120"';
    } else if (size == "big") {
        attr = 'width="820" height="1400"';
    } else if (size == "body") {
        attr = 'width="256" height="437"';
    } else if (size == "face") {
        attr = 'width="256" height="535"';
    }

    var canvas = "";
    if (size == "face" || size == "body") {
        $("canvas").remove("");
        $("#stage").append('<canvas ' + attr + '></canvas>');
        canvas = document.getElementsByTagName("canvas")[0];
    } else {
        $("canvas.overlay-canvas").remove("");
        $(".overlay-popup").append('<canvas class="overlay-canvas"' + attr + '></canvas>');
        $(".overlay-canvas").css("background-color", $("#color-picker").val() );        
        canvas = document.getElementsByClassName("overlay-canvas")[0];
    };

    var ctx = canvas.getContext("2d");

    // -------------------------------------------------
    // DRAW AVATAR -------------------------------------
    // -------------------------------------------------


    // Cargar piel
    var img = "";
    if (customSucrette.avatar.customSkin == null || size == "face") {
        img = "https://assets3.corazondemelon.es/avatarpart/web/thumb_MD/" + customSucrette.avatar.skin + ".png";
    } else {
        img = customSucrette.avatar.customSkin;
    };
    
    if (size == "body" || size == "small") { img = img.replace("thumb_MD", "normal");
    } else if (size == "medium") { img = img.replace("thumb_MD", "normal_MD");
    } else if (size == "face" || size == "big") { img = img.replace("thumb_MD", "normal_HD") };
    var ready = await preloadIMG(img);
    
    if (size == "body") { 
        ctx.drawImage(ready, 0, 0, 256, 437)
    } else if (size == "face") { 
        ctx.drawImage(ready, -255, -130);
    } else { 
        ctx.drawImage(ready, 0, 0); 
    }


    // -------------------------------------------------
    var baseIMG = "https://assets3.corazondemelon.es/avatarpart/web/normal";
    if (size == "body" || size == "small") { baseIMG += "/";
    } else if (size == "medium") { baseIMG += "_MD/";
    } else if (size == "big" || size == "face") { baseIMG += "_HD/"; }
    // -------------------------------------------------



    // Cargar ojos
    var img = baseIMG + customSucrette.avatar.eyeType + "_" + customSucrette.avatar.eyeColor + "_";
    if (customSucrette.avatar.customSkin == null || size == "face") {
        img += customSucrette.avatar.skin + ".png";
    } else {
        img += customSucrette.avatar.tempSkinColor + ".png";
    }

    var ready = await preloadIMG(img);
    
    if (size == "body") { 
        ctx.drawImage(ready, 0, 0, 256, 437)
    } else if (size == "face") { 
        ctx.drawImage(ready, -255, -130);
    } else { 
        ctx.drawImage(ready, 0, 0); 
    }



    // Cargar boca
    var img = baseIMG + customSucrette.avatar.mouth + "_";

    if (customSucrette.avatar.customSkin == null || size == "face") {
        img += customSucrette.avatar.skin + ".png";
    } else {
        img += customSucrette.avatar.tempSkinColor + ".png";
    }


    var ready = await preloadIMG(img);
    
    if (size == "body") { 
        ctx.drawImage(ready, 0, 0, 256, 437)
    } else if (size == "face") {
        ctx.drawImage(ready, -255, -130);
    } else { 
        ctx.drawImage(ready, 0, 0); 
    }



    // Cargar cejas
    var img = baseIMG + customSucrette.avatar.eyebrow + "_" + customSucrette.avatar.hairColor + ".png";
    var ready = await preloadIMG(img);
    
    if (size == "body") { 
        ctx.drawImage(ready, 0, 0, 256, 437)
    } else if (size == "face") { 
        ctx.drawImage(ready, -255, -130);
    } else { 
        ctx.drawImage(ready, 0, 0); 
    }



    // Cargar ropa interior (si la piel no la oculta && si no hay vestido)
    var isHidden;
    if (customSucrette.avatar.customSkin != null) {
        isHidden = customSucrette.avatar.customSkin;
        isHidden = clothe.filter(v => {return v.src == isHidden});
        isHidden = info.filter(v => {return v.groupId == isHidden[0].groupId});
        if (isHidden[0].hide != undefined) {
            for ( m = 0; m < isHidden[0].hide.length; m++ ) {
                if (isHidden[0].hide[m] == "underwears") { isHidden = true; break; };
            };
        } else { isHidden = false; };
    }

    var hayDress = customSucrette.clothe.filter(v => {return v.category == "Dress"});
    if (hayDress.length == 1) { isHidden = true };
    
    if (size == "face") {
        var busca = customSucrette.clothe.filter(v => {return v.category == "underwears"});
        var img = busca[0].src;
        img = img.replace("thumb", "normal");

        if (size == "body" || size == "small") { img = img.replace("_MD", "");
        } else if (size == "big" || size == "face") { img = img.replace("_MD", "_HD"); }

        var ready = await preloadIMG(img);
        
        if (size == "body") { 
            ctx.drawImage(ready, 0, 0, 256, 437)
        } else if (size == "face") { 
            ctx.drawImage(ready, -255, -130);
        } else { 
            ctx.drawImage(ready, 0, 0); 
        }
    }



    // Cargar cabello
    var buscaWig = customSucrette.clothe.filter(v => {return v.category == "wig"});
    if (buscaWig.length == 0 || size == "face") {
        // Si hay 
        var img = baseIMG + customSucrette.avatar.hairStyle + "_" + customSucrette.avatar.hairColor + ".png";
        var ready = await preloadIMG(img);
        
        if (size == "body") { 
            ctx.drawImage(ready, 0, 0, 256, 437)
        } else if (size == "face") { 
            ctx.drawImage(ready, -255, -130);    
        } else { 
            ctx.drawImage(ready, 0, 0); 
        }
    };



    // Cargar maquillaje (si existe)
    if (customSucrette.avatar.makeUp != null) {
        var img = baseIMG + customSucrette.avatar.makeUp + ".png";
        var ready = await preloadIMG(img);
        
        if (size == "body") { 
            ctx.drawImage(ready, 0, 0, 256, 437)
        } else if (size == "face") { 
            ctx.drawImage(ready, -255, -130);
        } else { 
            ctx.drawImage(ready, 0, 0); 
        }
    };

    // -------------------------------------------------
    // DRAW CLOTHE -------------------------------------
    // -------------------------------------------------

    if (size != "face") {
        var ropa = customSucrette.clothe.filter(v => {return v.category != ""});
        for (z = 0; z < ropa.length; z++) {
            if (ropa[z].category != "underwears" || (ropa[z].category == "underwears" && !isHidden)) {
                var img = ropa[z].src;
                img = img.replace("thumb", "normal");

                if (size == "body" || size == "small") { img = img.replace("_MD", "");
                } else if (size == "big") { img = img.replace("_MD", "_HD"); }
                
                var ready = await preloadIMG(img);

                if (size == "body") { 
                    ctx.drawImage(ready, 0, 0, 256, 437)
                } else { 
                    ctx.drawImage(ready, 0, 0); 
                };
            };
        };
    };
};

function updateCustom(img) {
    var categoria = clothe.filter(v => {return v.src == img});
    categoria = info.filter(v => {return v.groupId == categoria[0].groupId});
    categoria = categoria[0].category;

    // ---------------------------------------------------------
    // ---------------------------------------------------------
    // ---------------------------------------------------------

    // Obtener máximo
    var max = customSucrette.maxCategory.filter(v => {return v.category == categoria});
    max = max[0].max;

    // Si supera el maximo checkar que hacer
    var caseMax = customSucrette.maxCategory.filter(v => {return v.category == categoria});
    caseMax = caseMax[0].type;

    // Buscar existentes
    var existe = customSucrette.clothe.filter(v => {return v.category == categoria});
    if (categoria == "skin") {
        existe.length = 0;
        var obj = {"category": categoria, "src": customSucrette.avatar.skin};
        existe.push(obj);
    };

    if (existe.length < max) {
        // Comprobar si es heels o shoe
        if (categoria == "shoe") {
            var hayHeels = customSucrette.clothe.filter(v => {return v.category == "highHeels"});
            (hayHeels.length == 1) ? caseMax = "replaceHeels" : caseMax = "add";
        } else if (categoria == "highHeels") {
            var hayShoes = customSucrette.clothe.filter(v => {return v.category == "shoes"});
            (hayShoes.length == 1) ? caseMax = "replaceShoes" : caseMax = "add";
        } else { caseMax = "add"; };
    };

    // Comprobar si el objeto ya está añadido
    var isAdded = existe.filter(v => {return v.src == img});
    if (isAdded.length == 1) {
        if (categoria != "skin" && categoria != "underwears") {
            caseMax = "remove";
        } else {
            caseMax = "block";
        };
    };

    if (caseMax != "block") {
        var obj = {"category": categoria, "src": img};

        if (caseMax == "add") {
            // Nuevo
            customSucrette.clothe.push(obj);

        } else if (caseMax == "replace") {
            // Reemplazar existente
            // skin y underwear en las capas existentes, el resto en nuevas capas

            if (categoria == "skin") {
                if (img.includes("avatarpart")) {
                    img = img.replace("https://assets3.corazondemelon.es/avatarpart/web/thumb_MD/", "");
                    img = img.replace(".png", "");
                    customSucrette.avatar.skin = img;
                } else {
                    if (customSucrette.avatar.customSkin == img) {
                        customSucrette.avatar.customSkin = null;
                        caseMax = "remove";
                    } else {
                        customSucrette.avatar.customSkin = img;
                        var temp = clothe.filter(v => {return v.src == img});
                        if (temp[0].skinValue != 0) {
                            temp = temp[0].skinValue;
                            temp = avatar[7].skinColor.filter(v => {return v.value == temp});
                            customSucrette.avatar.tempSkinColor = temp[0].id;
                        } else {
                            customSucrette.avatar.tempSkinColor = "no";
                        }
                        caseMax = "replace";
                    };
                };
                
            } else if (categoria == "underwears") {
                var h = customSucrette.clothe.map(function(e) { return e.category; }).indexOf(categoria);
                customSucrette.clothe[h].src = img;
            } else {
                var h = customSucrette.clothe.map(function(e) { return e.category; }).indexOf(categoria);
                customSucrette.clothe.splice(h, 1);
                customSucrette.clothe.push(obj);
            };

        } else if (caseMax == "replaceShoes") {
            // Quitar shoes, agregar heels
            var h = customSucrette.clothe.map(function(e) { return e.category; }).indexOf("shoes");
            customSucrette.clothe.splice(h, 1);
            customSucrette.clothe.push(obj);

        } else if (caseMax == "replaceHeels") {
            // Quitar heels, agregar shoes
            var h = customSucrette.clothe.map(function(e) { return e.category; }).indexOf("shoes");
            customSucrette.clothe.splice(h, 1);
            customSucrette.clothe.push(obj);

        } else if (caseMax == "remove") {
            // La prenda ya existe, quitar
            var h = customSucrette.clothe.map(function(e) { return e.src; }).indexOf(img);
            customSucrette.clothe.splice(h,1);
        };

    
    // Comprobar heels!
    var hayHeels = customSucrette.clothe.filter(v => {return v.category == "highHeels"});
    (hayHeels.length == 0) ? heelsOn = false : heelsOn = true;

    // ---------------------------------------------------------
    // ---------------------------------------------------------
    // ---------------------------------------------------------


        console.log("-------------------------------------------");
        for (x = 0; x < customSucrette.clothe.length; x++) {
            console.log(x + "- cat:" + customSucrette.clothe[x].category + ", src:" + customSucrette.clothe[x].src);
        };
        console.log("-------------------------------------------");

        drawPanel();
        drawSucrette("body");
    };
};

function pagination(pages, active) {
    $(".custom-pagination").html("");

    if (pages > 1) {
        // Incluye ceros
        if (pages < 8) {
            /* Sin truncation
            visible 1 2 3 4 5 6 7
            indices 0 1 2 3 4 5 6
            */

            var num = 0;

            for (a = 0; a < pages; a++) {
                num += 1;

                if (a != active) {
                    $(".custom-pagination").append('<div class="pagination"><div class="page" page-number="' + num + '">' + num + '</div></div>');
                } else {
                    $(".custom-pagination").append('<div class="pagination current"><div class="page selected" page-number="' + num + '">' + num + '</div></div>');
                }
            }

            
        } else if (pages > 7) {

            var num = 0;

            if (active < 4) {
                /* Con truncation al final
                visible 1 2 3 4 5 ... 8
                indices 0 1 2 3 4 .5. 7
                */

                for (a = 0; a < pages; a++) {
                    num++;

                    if (a != active) {
                        if (a == 5) {
                            $(".custom-pagination").append('<div class="pagination"><div class="page" data-page="' + a + '" page-number="' + num + '">...</div></div>');
                            a = pages - 2;
                            num = a + 1;
                        } else {
                            $(".custom-pagination").append('<div class="pagination current"><div class="page" page-number="' + num + '">' + num + '</div></div>');
                        };

                    } else {
                        $(".custom-pagination").append('<div class="pagination current"><div class="page selected" page-number="' + num + '">' + num + '</div></div>');
                    };
                };
            } else if (active > (pages - 5)) {
                /* Con truncation al inicio
                visible 1 ... 4 5 6 7 8
                indices 0 .2. 3 4 5 6 7
                */

                for (a = 0; a < pages; a++) {
                    num++;
                    if (a != active) {
                        if (a == 1) {
                            a = pages - 6;
                            $(".custom-pagination").append('<div class="pagination"><div class="page" data-page="' + a + '" page-number="' + num + '">...</div></div>');
                            num = a + 1;
                        } else {
                            $(".custom-pagination").append('<div class="pagination current"><div class="page" page-number="' + num + '">' + num + '</div></div>');
                        }

                    } else {
                        $(".custom-pagination").append('<div class="pagination current"><div class="page selected" page-number="' + num + '">' + num + '</div></div>');
                    };
                };
            } else {
                /* Truncation al inicio y al final (+8 pags)
                visible 1 ... 4 5 6 ... 9
                indices 0 .2. 3 4 5 .6. 8
                */

                for (a = 0; a < pages; a++) {
                    num++;
                    if (a != active) {
                        if (a == 1) {
                            a = active - 2;
                            $(".custom-pagination").append('<div class="pagination"><div class="page" data-page="' + a + '" page-number="' + num + '">...</div></div>');
                            num = a + 1;

                        } else if (a == (parseInt(active) + 2)) {
                            $(".custom-pagination").append('<div class="pagination"><div class="page" data-page="' + a + '" page-number="' + num + '">...</div></div>');
                            a = pages - 2;
                            num = a + 1

                        } else {
                            $(".custom-pagination").append('<div class="pagination current"><div class="page" page-number="' + num + '">' + num + '</div></div>');
                        }

                    } else {
                        $(".custom-pagination").append('<div class="pagination current"><div class="page selected" page-number="' + num + '">' + num + '</div></div>');
                    };
                };
            };
        };
    };
};

function drawPanel() {
    $(".clothes-container").html("");

    for (c = 0; c < customSucrette.clothe.length; c++) {
        $(".clothes-container").prepend('<div class="cdk-drag row-z-index-manager"><div class="cloth-asset"><img src="' + customSucrette.clothe[c].src + '"></div></div>');

        var temp = clothe.filter(v => {return v.src == customSucrette.clothe[c].src});
        temp = info.filter(v => {return v.groupId == temp[0].groupId});

        $(".row-z-index-manager").eq(0).append('<div class="cloth-name">' + temp[0].name + '</div>');
        $(".row-z-index-manager").eq(0).append('<div class="selector-position"></div>');

        $(".selector-position").eq(0).append('<div class="selector up" data-position="' + c + '"><span class="fa fa-chevron-up"></span></div>');
        $(".selector-position").eq(0).append('<div class="selector down" data-position="' + c + '"><span class="fa fa-chevron-down"></span></div>');

        if (c == 0) { $(".selector.down").eq(0).addClass("disabled"); };
        if (c == (customSucrette.clothe.length - 1)) { $(".selector.up").eq(0).addClass("disabled"); };
        if (customSucrette.clothe[c].category != "underwears") {
            $(".row-z-index-manager").eq(0).append('<div class="delete" data-position="' + c + '"><span class="fa fa-times"></span></div>');
        };
    };
};

function updatePanel(type, position) {

    if (type != "delete") {
        var elmnt = customSucrette.clothe.splice(position, 1);
        if (type == "down") { position--; }
        if (type == "up") { position++; }

        customSucrette.clothe.splice(position, 0, elmnt[0]);
    } else {
        customSucrette.clothe.splice(position, 1);
    };

    drawPanel();
    drawSucrette("body");
};


$(function() {

    $(".category").click(function() {
        $(".showcase").removeAttr("data-groupid");
        $(".category.selected").removeClass("selected");
        $(this).addClass("selected");
        var nombre = categoriaNombre();
        $(".category-name").text(nombre);
        $("#cloth-list button").removeAttr("class");

        var esAvatar = checkType();

        if (esAvatar) {
            cargarAvatar();
        } else {
            $(".search input").val("");
            cargarRopa();
        };
    });

    $("#cloth-list button").click(function() {
        var pagina = $("#cloth-list button").attr("data-pagelist");
        $("#cloth-list button").removeAttr("data-pagelist");
        $("#cloth-list button").removeAttr("class");
        $(".showcase").removeAttr("data-groupid");
        cargarRopa(pagina);
    });

    $(".custom-pagination").on("click", ".page", function() {
        if ($(this).attr("class") != "page selected") {

            var pagina = $(this).attr("page-number");
            if (pagina != "...") {
                pagina = parseInt(pagina) - 1;
            } else {
                pagina =  $(this).attr("data-page");
            }

            // Comprobar sublistas
            var subin = $(".showcase").attr("data-groupid");

            if (isNaN(subin)) {
                if (checkType()) {
                    cargarAvatar(pagina);
                } else {
                    cargarRopa(pagina);
                };
                
            } else {
                cargarRopa(0, subin, pagina);
            };
        };
    });

    $(".showcase").on("click", ".declinable-hanger", function() {
        var indice = parseInt($(this).attr("data-groupid"));
        
        if (isNaN(indice)) {
            // Comprobar seleccionados
            var clase = $(this).find(".hanger.clickable").attr("class");

            if (clase.includes("selected")) {
                var cat = $(this).attr("data-category");
                if (cat != "underwears") { $(this).find(".hanger.clickable").removeClass("selected"); };
            } else {
                var value = checkMaxSelect($(this).attr("data-category"));
                if (value == "select") {
                    $(this).find(".hanger.clickable").addClass("selected");
                } else if (value == "replace") {
                    $(".hanger.clickable.selected").removeClass("selected");
                    $(this).find(".hanger.clickable").addClass("selected");
                };
            };

            // Cargar ropa
            var enlace = $(this).find("img").attr("src");
            updateCustom(enlace);

        } else {
            // Abrir variaciones
            var pagina = parseInt($(".page.selected").text()) - 1;
            if (isNaN(pagina)) {
                $("#cloth-list button").attr("data-pagelist", 0);
            } else {
                $("#cloth-list button").attr("data-pagelist", pagina);
            };

            cargarRopa(pagina, indice);
            $("#cloth-list button").addClass("visible");
        };
    });

    $(".showcase").on("click", ".declinable-avatar", function() {
        var categoria = $(this).attr("data-category");
        var temp = $(this).index();
        temp = $(".declinable-avatar img").eq(temp).attr("src");
        var temp = temp.replace("https://assets3.corazondemelon.es/avatarpart/web/thumb_MD/","");
        var temp = temp.replace(".png","");
        temp = temp.split("_");

        if (categoria == "hairStyle") {customSucrette.avatar.hairStyle = temp[0];
        } else if (categoria == "hairColor") {customSucrette.avatar.hairColor = temp[1];
        } else if (categoria == "eyeType") {customSucrette.avatar.eyeType = temp[0];
        } else if (categoria == "eyeColor") {customSucrette.avatar.eyeColor = temp[1];
        } else if (categoria == "eyebrow") {customSucrette.avatar.eyebrow = temp[0];
        } else if (categoria == "mouth") {customSucrette.avatar.mouth = temp[0];
        } else if (categoria == "skinColor") {customSucrette.avatar.skin = temp[0];
        } else if (categoria == "makeUp") {
            (temp[0] == customSucrette.avatar.makeUp) ? customSucrette.avatar.makeUp = null : customSucrette.avatar.makeUp = temp[0];
        };

        /* Comprobar seleccion */
        var clase = $(this).find(".hanger.clickable").attr("class");
        if (clase.includes("selected") && categoria == "makeUp") {
            $(this).find(".hanger.clickable").removeClass("selected");
        } else {
            $(".hanger.clickable").removeClass("selected");
            $(this).find(".hanger.clickable").addClass("selected");
        };

        drawSucrette("face");
    });

    $(".arrow.right").click(function() {

        var izq = $(".arrow.left").attr("class");
        if (izq.includes("disabled")) $(".arrow.left").removeClass("disabled");

        var clase = $(this).attr("class");
        if (!clase.includes("disabled")) {
            var maxCategories = "-300px";
            var px = maxCategories;

            $(".categories").css("left", px);
            $(this).addClass("disabled");
        };
    });

    $(".arrow.left").click(function() {

        var der = $(".arrow.right").attr("class");
        if (der.includes("disabled")) $(".arrow.right").removeClass("disabled");

        var clase = $(this).attr("class");
        if (!clase.includes("disabled")) {
            var px = $(".categories").css("left");

            px = 0;
            $(".categories").css("left", px);
            $(this).addClass("disabled");
        };
    });

    $(".showcase").on("mouseenter", ".hanger.clickable", function() {
        $(this).find(".declinations").addClass("isHover");
    });

    $(".showcase").on("mouseleave", ".hanger.clickable", function() {
        $(this).find(".declinations").removeClass("isHover");
    });

    $(".button.face").click(function() {
        $(".button.move").addClass("disabled");
        var a = $(".layout-move-panel").attr("class");
        if (a.includes("visible")) $(".layout-move-panel").removeClass("visible");

        // Cambiar a avatar
        $(".face-categories").show();
        $(".categories-container").hide();
        $(".search").hide();
        $("#size-chooser").hide();
        $(".search input").val("");

        $(".button.body").show();
        $(".button.face").hide();

        $(".showcase").removeAttr("data-groupid");
        $("#cloth-list button").removeAttr("class");
        $(".category.selected").removeClass("selected");
        $("#category-hairStyle").addClass("selected");
        $(".category-name").text( categoriaNombre() );
        cargarAvatar();
        drawSucrette("face");
    });

    $(".button.body").click(function() {
        $(".button.move").removeClass("disabled");

        // Cambiar a cuerpo
        $(".face-categories").hide();
        $(".categories-container").show();
        $(".search").show();
        $("#size-chooser").show();

        $(".button.body").hide();
        $(".button.face").show();

        $("#cloth-list button").removeAttr("class");
        $(".showcase").removeAttr("data-groupid");

        $(".category.selected").removeClass("selected");
        $("#category-Wig").addClass("selected");

        $(".category-name").text( categoriaNombre() );

        cargarRopa();
        drawSucrette("body");
    });

    $(".button.save").click(function() {
        var clase =  $(".save-popup").attr("class");
        if (clase.includes("hidden")) {
            $(".save-popup").removeClass("hidden");
        } else {
            $(".save-popup").addClass("hidden");
        }
    });

    $(".download-image").click(function() {
        $(".save-popup").addClass("hidden");
        // Guardar Sucrette
        $("body").append('<div class="overlay-container"><div class="overlay navigation-menu"></div></div>');
        $(".overlay.navigation-menu").append('<a class="overlay-button-save size-small">Pequeño</a>');      // 410 x 700
        $(".overlay.navigation-menu").append('<a class="overlay-button-save size-medium">Mediano</a>');     // 656 x 1120
        $(".overlay.navigation-menu").append('<a class="overlay-button-save size-big active">Grande</a>');  // 820 x 1400
        $(".overlay.navigation-menu").append('<a class="overlay-button-save config" style="left: 20px;"><span class="fa fa-gear"></span></a>');  // boton config

        $(".overlay-container").append('<div class="overlay-popup"></div>');
        $(".overlay-container .overlay-popup").append('<div class="button-close"><span class="fa fa-times"></span></div>');
        $(".overlay-container .overlay-popup").append('<div id="overlay-popup-config"><div> <div class="inner"></div> </div></div>');
        $("#overlay-popup-config div .inner").append('<p>Cambiar color de fondo:</p><p><div id="color-picker-container"><input id="color-picker" type="color"></div></p>');

        $("html").css("overflow", "hidden");

        // Cargar Sucrette
        drawSucrette("big");
    });

    $(".get-code").click(function() {
        $(".save-popup").addClass("hidden");
        var codigo = generateCode();
        //alert(codigo);
        drawPopUpCode(codigo);
    }) 

    $("body").on("click", ".button-close", function() {
        $(".overlay-container").remove();
        $("html").css("overflow", "auto");
    });

    $("body").on("click", ".overlay-button-save", function() {
        var clase = $(this).attr("class");

        if (!clase.includes("active") && !clase.includes("config") && !clase.includes("times") ) {
            // Restaurar boton y popup de config
            $("#overlay-popup-config").fadeOut(200);
            if($(".overlay-button-save.config span.fa.fa-times").length > 0) {
                $(".overlay-button-save.config span").removeClass("fa fa-times");
                $(".overlay-button-save.config span").addClass("fa fa-gear");
            };

            $(".overlay-button-save").removeClass("active");
            $(this).addClass("active");

            // Cargar Sucrette
            if (clase.includes("size-small")) {
                drawSucrette("small");
            } else if (clase.includes("size-medium")) {
                drawSucrette("medium");
            } else if (clase.includes("size-big")) {
                drawSucrette("big");
            };

        } else if (clase.includes("config")) {
            if (clase.includes("active")) {
                $(this).removeClass("active");
                $(".overlay-button-save.config span").removeClass("fa fa-times");
                $(".overlay-button-save.config span").addClass("fa fa-gear");
                $("#overlay-popup-config").fadeOut(200);
            } else {
                $(this).addClass("active");
                $(".overlay-button-save.config span").removeClass("fa fa-gear");
                $(".overlay-button-save.config span").addClass("fa fa-times");
                $("#overlay-popup-config").fadeIn(200);
            };
        };
    });

    $("body").on("change", "#color-picker", function() {
        var color = $(this).val();
        $(".overlay-canvas").css("background-color", color);

    });

    $(".button.move").click(function() {
        var enabled = $(this).attr("class");

        if (!enabled.includes("disabled")) {
            var clase = $(".layout-move-panel").attr("class");

            if (clase.includes("visible")) {
                $(".layout-move-panel").removeClass("visible");
            } else {
                $(".layout-move-panel").addClass("visible");
            };
        };
    });

    $(".closable-zone").click(function() {
        if ($(".layout-move-panel.visible").length == 1) {
            $(".layout-move-panel").removeClass("visible");
        };
    });

    $(".close-panel").click(function() {
        if ($(".layout-move-panel.visible").length == 1) {
            $(".layout-move-panel").removeClass("visible");
        };
    })

    $(".clothes-container").on("click", ".selector", function() {
        var clase = $(this).attr("class");
        if (!clase.includes("disabled")) {
            var data = $(this).attr("data-position");

            if (clase.includes("up")) {
                updatePanel("up", parseInt(data));
            } else if (clase.includes("down")) { 
                updatePanel("down", parseInt(data));
            };
        };
    });

    $(".clothes-container").on("click", ".row-z-index-manager .delete", function() {
        var data = $(this).attr("data-position");
        updatePanel("delete", parseInt(data));
        var item = $(".hanger.clickable.selected");

        if (item.length > 0) {
            item = item.find(".item img").attr("src");
            var deleted = $(this).parents(".row-z-index-manager").find("img").attr("src");

            if (item == deleted) {
                $(".hanger.clickable.selected").removeClass("selected");
            };
        };
    });

    $(".search input").on("input", function() {
        if ($(this).val() != "") {
            $(".category.selected").removeClass("selected");
            $(".category-name").text("Mostrando resultados");
        } else {
            $("#category-Wig").addClass("selected");
            var nombre = categoriaNombre();
            $(".category-name").text(nombre);
        };

        $(".showcase").removeAttr("data-groupid");
        $("#cloth-list button").removeAttr("class");

        cargarRopa();        
    });

    $(".size-button").click(function() {
        var clase = $(this).attr("class");

        if (!clase.includes("actif")) {
            $(".size-button").removeClass("actif");
            $(this).addClass("actif");

            $("#cloth-list button").removeAttr("data-pagelist");
            $("#cloth-list button").removeAttr("class");
            $(".showcase").removeAttr("data-groupid");

            cargarRopa();
        };
    });
});


/* Funciones return */
function categoriaSeleccionada() {

    var elmnt = $(".category.selected");
    var name = elmnt.attr("id");

    if (name == "category-Wig") return "wig";
    if (name == "category-HairAccessory") return "hairAccessory";
    if (name == "category-Jacket") return "jacket";
    if (name == "category-Shirt") return "shirt";
    if (name == "category-Underwears") return "underwears";
    if (name == "category-Pants") return "pants";
    if (name == "category-Socks") return "socks";
    if (name == "category-Shoes") return "shoes";
    if (name == "category-Necklace") return "necklace";
    if (name == "category-Dress") return "Dress";
    if (name == "category-Accessory") return "accessory";
    if (name == "category-Purse") return "purse";
    if (name == "category-Skin") return "skin";

    if (name == "category-hairStyle") return "hairStyle";
    if (name == "category-hairColor") return "hairColor";
    if (name == "category-eyeType") return "eyeType";
    if (name == "category-eyeColor") return "eyeColor";
    if (name == "category-eyebrow") return "eyebrow";
    if (name == "category-mouth") return "mouth";
    if (name == "category-makeUp") return "makeUp";
    if (name == "category-skinColor") return "skinColor";
    return "none";
};

function categoriaNombre() {
    var elmnt = $(".category.selected");
    var name = elmnt.attr("id");

    if (name == "category-Wig") return "Pelucas";
    if (name == "category-HairAccessory") return "Sombreros";
    if (name == "category-Jacket") return "Chaquetas";
    if (name == "category-Shirt") return " Partes de arriba";
    if (name == "category-Underwears") return " Ropa interior";
    if (name == "category-Pants") return "Pantalones";
    if (name == "category-Socks") return "Calcetines";
    if (name == "category-Shoes") return "Zapatos";
    if (name == "category-Necklace") return "Collares";
    if (name == "category-Dress") return "Vestidos";
    if (name == "category-Accessory") return "Complementos";
    if (name == "category-Purse") return "Bolsos";
    if (name == "category-Skin") return "Pieles";

    if (name == "category-hairStyle") return "Mi peinado";
    if (name == "category-hairColor") return "Color de pelo";
    if (name == "category-eyeType") return "Forma de los ojos";
    if (name == "category-eyeColor") return "Color de ojos";
    if (name == "category-eyebrow") return "Forma de las cejas";
    if (name == "category-mouth") return "Forma y color de la boca";
    if (name == "category-makeUp") return "Maquillaje";
    if (name == "category-skinColor") return "Tonos de piel";
};

function checkType() {
    var name = categoriaSeleccionada();

    if (name.includes("Style") || name.includes("Color") || 
        name.includes("Type") || name.includes("eyebrow") || 
        name.includes("mouth") || name.includes("makeUp")) {
        return true;
    } else {
        return false;
    };
};

function checkMaxSelect(categoria) {
    var busca = $(".category-name").text();
    if (categoria == "skinColor") categoria = "skin";
    var cat = customSucrette.maxCategory.filter(v => {return v.category == categoria});

    if (cat[0].type != "replace") {
        var count = customSucrette.clothe.filter(v => {return v.category == categoria});
        if (count.length < cat[0].max && cat[0].max != "undefined") { return "select"; } 
        else if (count.length == cat[0].max) { return "block"; }
        else { return "select"};
    } else if (busca == "Mostrando resultados") {
        var sub = $(".showcase").attr("data-groupid");
        if ( sub !== undefined) {
            if (cat[0].type == "replace") return "replace";
        } return "select";
    } return "replace";
};