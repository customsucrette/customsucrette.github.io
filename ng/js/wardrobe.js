$(document).ready(function() {
    $.get("./data/cloth.json", dbCloth => {
        $.get("./data/avatar.json", dbAvatar => {
            $(".version").text("BETA v0.8.1");
            cloth = dbCloth;
            avatar = dbAvatar;
            customTheme();
            userSettings();
            drawCategory();
            fillCounter();
            drawAvatarZone();
            drawSucrette();
            drawZIndex();
        });
    });
});

function customTheme() {
    let p = window.localStorage.getItem("personality");
    if (p == null) p = "sweet";
    window.localStorage.setItem("personality", p);

    $("body").attr("class", `personality-${p}`);
    $(".personality-icon").removeClass("active");
    $(`.personality-icon.${p}`).addClass("active");
    $(".filters-button").attr("class", `filters-button ${p} disabled`); // ACTUALIZAR
    $(".filters-button img").attr("src", `assets/personalization/icon/filter-${p}.png`);

    $("#sub-link-favorite-outfit-img").attr("src", `assets/personalization/icon/favorite-outfit-${p}.png`);
    $("#sub-link-z-index-img").attr("src", `assets/personalization/icon/z-index-${p}.png`);
    $("#sub-link-avatar-part-img").attr("src", `assets/personalization/icon/avatar-part-${p}.png`);
    $("#sub-link-delete-img").attr("src", `assets/personalization/icon/delete-${p}.png`);
    
    $("#asng-z-index .front-icon img").attr("src", `assets/personalization/z-index/top-${p}.svg`);
    $("#asng-z-index .back-icon img").attr("src", `assets/personalization/z-index/back-${p}.svg`);
};

function userSettings() {
    if (hr == null) hr = "sd";
    if (cr == null) cr = "md";
    if (rt == null) rt = "day";

    window.localStorage.setItem("hanger_res", hr);
    window.localStorage.setItem("canvas_res", cr);
    window.localStorage.setItem("room_time", rt);

    $(".option-picker .choice").removeClass("active");
    $(`#icon-${hr}`).addClass("active");
    $(`#canvas-${cr}`).addClass("active");

    if (rt == "day") {
        $(".asng-toggle-switch label").addClass("off");
        $(".graphics .asng-toggle-switch .slider").addClass("off");
    } else {
        $(".asng-toggle-switch label").removeClass("off");
        $(".graphics .asng-toggle-switch .slider").removeClass("off");
    };

    $(".asng-room-canvas").css("background-image", `url(https://assets.corazondemelon-newgen.es/room-item/image/full/md/1-${rt}-12345678abcdef.jpg)`);
}

function drawCategory(c = "top", declination = null) {
    
    // filter ?
    // grouped ?

    var lista = cloth.filter(v => {return v.category == c})
    var type = "cloth";

    if (c == "eyebrows" || c == "eyes" || c == "mouth") {
        lista = avatar.collections[c].filter(v => {return v.category == c});
        type = c;

    } else if (c == "expressions") {
        // pendiente
    }


    if (lista.length > 0) {

        $("asng-cloth-list-panel .empty").remove();

        if (declination == null) {
            $(".items-container").html("");
    
            // General grouped list
    
            for (i = 0; i < lista.length; i++) {
                if (lista[i].variations.length > 1) {
                    $(".items-container").append(`<div class="asng-cloth grouped" data-item="${lista[i].groupId}-${lista[i].variations[0].id}"></div>`);
                    $(".asng-cloth").eq(i)
                    .append('<img src="assets/personalization/hanger.png" class="hanger" />')
                    .append('<div class="group" tooltipplacement="bottom" tooltippanelclass="asng-dressing-item-tooltip"></div>');
                    $(".asng-cloth").eq(i).find('div')
                    .append(`<img class="thumbnail" alt="${lista[i].name}" src="${composeHangerUrl(lista[i].variations[0].id, lista[i].security, type)}">`)
                    .append(`<div class="counter">${lista[i].variations.length}</div>`);
                } else {
                    var dataI = `${lista[i].groupId}-${lista[i].variations[0].id}`;

                    $(".items-container").append(`<div class="asng-cloth item" data-category="${lista[i].category}" data-item="${dataI}"></div>`);
                    $(".asng-cloth").eq(i)
                        .append('<img src="assets/personalization/hanger.png" class="hanger" />')
                        .append('<div class="item"><div class="item-outline"></div></div>');
                    $(`.asng-cloth[data-item="${dataI}"] .item`)
                        .append('<div tooltipplacement="bottom" tooltippanelclass="asng-dressing-item-tooltip"></div>');
                    $(`.asng-cloth[data-item="${dataI}"] div`).not(".item").not('.item-outline')
                    .append(`<img class="thumbnail" alt="${lista[i].name}" src="${composeHangerUrl(lista[i].variations[0].id, lista[i].security, type)}">`);
        
                };
            };
    
        } else {
            // Grouped list with open declinations

            var d = cloth.filter(v => {return v.groupId == declination});

            if (c == "eyebrows" || c == "eyes" || c == "mouth") {
                d = avatar.collections[c].filter(v => {return v.groupId == declination});
        
            } else if (c == "expressions") {
                // pendiente
            }

    
            let filas = Math.ceil((d[0].variations.length + 1) / 3); // Filas totales
            $(".declinations-list-container").attr("style", `height: calc(140px * ${filas})`);
    
            for (x = 0; x < d[0].variations.length; x++) {
                $('.declinations-panel').append(`<div class="asng-cloth item" data-category="${c}" data-item="${d[0].groupId}-${d[0].variations[x].id}"></div>`);
                $(".declinations-panel .asng-cloth").eq(x)
                    .append('<img src="assets/personalization/hanger.png" class="hanger" />')
                    .append('<div class="item"><div class="item-outline"></div></div>');
                $('.declinations-panel .asng-cloth .item').eq(x)
                    .append('<div tooltipplacement="bottom" tooltippanelclass="asng-dressing-item-tooltip"></div>');
                $('.declinations-panel .asng-cloth .item').eq(x).find('div').not('.item-outline')
                    .append(`<img class="thumbnail" alt="${d[0].name}" src="${composeHangerUrl(d[0].variations[x].id, d[0].security, type)}">`);
                    
            };
        }
    } else {
        $(".items-container").html("");
        $("asng-cloth-list-panel").append('<div class="empty"><img class="taki" src="https://www.corazondemelon-newgen.es/assets/taki/box.png" /><p>No hay elementos en esta categoría.</p></div>');
        if ($('.category-list-item.current').attr('data-category') == "expression") {
            $('.empty p').text("Próximamente...");
        }
    };
};

function drawDeclinationPanel(index) {

    // buscar ubicación 
    let after = Math.ceil((index) * 0.34); // Insertar panel despues de AFTER filas
    let tg = $(".asng-cloth").length; // Items totales
    ((after < 3 && tg < 3) || after * 3 > tg) ? after = tg : after == 0 ? after = 3 : after = after * 3; // Insertar después de AFTER elementos

    $(".items-container > .asng-cloth:nth-child(" + (after) + ")").after(`<div class="declinations-list-container"></div>`);
    $(".declinations-list-container").append('<div class="inner-declinations"><div class="declinations-panel"></div></div>');
    var personality = $("body").attr("class").split("-")[1];
    $(".declinations-panel").append(`<img class="close" height="80" width="80" src="assets/personalization/item/close-declinations-${personality}.png">`);

}

function removeDeclinationPanel() {
    $(".asng-cloth").removeClass("selected").removeClass("not-selected");
    $(".declinations-list-container").remove();
}

function toggleCategoryMenu(status) {
    status.includes("open") ? $(".list").removeClass("open").addClass("closed") : $(".list").removeClass("closed").addClass("open");
}

function drawAvatarZone(c = "top", z = "auto") {
    if (z == "auto") {
        arr = ["head", "face", "torso", "arms", "waistToKnee", "feet", "general"];
        // buscar zona
        for (a = 0; a < arr.length; a++) {
            z = zone[arr[a]].filter(v => {return v.category == c});
            if (z.length > 0) {
                z = arr[a];
                break;
            };
        };

    } else if (c == "auto") {
        switch (z) {
            case "general": c = "tattoo";break;
            case "head": c = "hat";break;
            case "face": c = "makeup";break;
            case "torso": c = "top";break;
            case "arms": c = "gloves";break;
            case "waistToKnee": c = "pants";break;
            case "feet": c = "shoes";break;
        };

        // change category !
        $(".category-list-item.current").removeClass("current");
        $(`.category-list-item[data-category="${c}"]`).addClass("current");
        $(".current-category").text(getCategoryName(c));
        toggleCategoryMenu("open");
        drawCategory(c);
    };

    var currentZ = $(".avatar-personalization").attr("class");
    currentZ = currentZ.split(" ")[1];

    if (!(currentZ == z)) {
        $(".avatar-personalization").attr("class", `avatar-personalization ${z}`);

        $(".categories").html("");

        for (i = 0; i < zone[z].length; i++) {
            $(".categories").append(`<div id="dressing-section-category-${zone[z][i].category}" class="category" style="${zone[z][i].style}"></div>`);
            $(`#dressing-section-category-${zone[z][i].category}`).append('<div class="category-icon"></div>');
        };
    };

    $(".category").removeClass("current");
    $(`#dressing-section-category-${c}`).addClass("current");
}

function preloadIMG(src) {
    return new Promise(resolve => {
        var img = new Image();
        img.src = src;
        img.onload = () => {resolve(img)}; 
    });
};

async function drawSucrette(size = cr, mode = "load", rd = null) {
    // 1200 x 1550
    

    if (mode == "load" || mode == "update_avatar" || mode == "basics") {
        if (mode != "update_avatar") $("canvas").not("#save-canvas").remove();

        for (m = 0; m < sucrette.orderInfo.length; m++) {
            if (sucrette.orderInfo[m].category == "avatar") {
                $("#asng-avatar").append('<canvas id="avatar-base" width="1200" height="1550"></canvas>');

                // draw avatar base

                var ctx = $("#save-canvas").length == 0 ? document.getElementById("avatar-base").getContext("2d") : document.getElementById("save-canvas").getContext("2d");
                if (mode == "update_avatar" || mode == "basics") ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                var img = composeAvatarUrl("skin", size, (sucrette.avatar.customSkin == null)? sucrette.avatar.skin : sucrette.avatar.customSkin);
                var ready = await preloadIMG(img);
                ctx.drawImage(ready, 0, 0, 1200, 1550);

                img = composeAvatarUrl("eyes_skin", size, sucrette.avatar.eyes);
                ready = await preloadIMG(img);
                ctx.drawImage(ready, 0, 0, 1200, 1550);

                img = composeAvatarUrl("eyes", size, sucrette.avatar.eyes);
                ready = await preloadIMG(img);
                ctx.drawImage(ready, 0, 0, 1200, 1550);

                img = composeAvatarUrl("eyebrows_skin", size, sucrette.avatar.eyebrows);
                ready = await preloadIMG(img);
                ctx.drawImage(ready, 0, 0, 1200, 1550);

                img = composeAvatarUrl("eyebrows", size, sucrette.avatar.eyebrows);
                ready = await preloadIMG(img);
                ctx.drawImage(ready, 0, 0, 1200, 1550);

                img = composeAvatarUrl("mouth", size, sucrette.avatar.mouth);
                ready = await preloadIMG(img);
                ctx.drawImage(ready, 0, 0, 1200, 1550);

                if (mode == "basics") {
                    // Ropa interior
                    let x = sucrette.orderInfo.findIndex(v => v.category == "underwear");
                    var img = composeCanvasUrl("cloth", size, sucrette.orderInfo[x].value);
                    newCanvas("cloth mono", sucrette.orderInfo[x].category, img, 1);

                    // Cabello
                    img = composeAvatarUrl("hair", size, sucrette.avatar.hair, "back");
                    newCanvas("cloth multi", "hair", img, 2);

                    img = composeAvatarUrl("hair", size, sucrette.avatar.hair, "front");
                    newCanvas("cloth multi", "hair", img, 3);

                    break;
                }


            } else if (sucrette.orderInfo[m].category == "hair" && mode != "update_avatar") {

                // draw hair (no wig)
                var img = composeAvatarUrl("hair", size, sucrette.avatar.hair, sucrette.orderInfo[m].layer);
                newCanvas("cloth multi", `${sucrette.orderInfo[m].category}-${sucrette.orderInfo[m].layer}`, img, m);

            } else if (mode != "update_avatar" && mode != "basics") {

                // draw all

                var e = cloth.filter(v => {return v.security == ((sucrette.orderInfo[m].value).split("-")[1])})

                if (!(e[0].multiLayered)) {

                    // draw mono layer
                    var img = composeCanvasUrl("cloth", size, sucrette.orderInfo[m].value);
                    newCanvas("cloth mono",sucrette.orderInfo[m].category, img, m);
                
                } else {

                    // draw multi layer
                    var img = composeCanvasUrl("cloth", size, sucrette.orderInfo[m].value, sucrette.orderInfo[m].layer);
                    newCanvas("cloth multi", `${sucrette.orderInfo[m].category}-${sucrette.orderInfo[m].layer}`, img, m, "append");

                }

            }

        };

    } else if (mode == "new") {

        var temp = []
        
        if (rd == null) { // Es mono o es multi último
            rd = sucrette.orderInfo.length - 1;
        };

        temp.push (sucrette.orderInfo[rd]);

        if (temp[0].layer == null) {
            // Es mono
            var img = composeCanvasUrl("cloth", size, temp[0].value);
            newCanvas("cloth mono", sucrette.orderInfo[rd].category, img, rd);

        } else {
            // Es multi
            var T = temp[0].category != "hair" ? "cloth" : "avatar-part";
            var V = temp[0].category != "hair" ? temp[0].value : sucrette.avatar.hair;
            var P = rd == 0 ? "prepend" : "append";
            var img = temp[0].category != "hair" ? composeCanvasUrl(T, size, V, temp[0].layer) : composeAvatarUrl("hair", size, sucrette.avatar.hair, temp[0].layer);
            newCanvas("cloth multi", `${temp[0].category}-${temp[0].layer}`, img, rd, P);
        };

    } else if (mode == "replace") {
        var ctx = document.getElementsByTagName("canvas")[rd].getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        var T = sucrette.orderInfo[rd].category != "hair" ? "cloth" : "avatar-part";
        var V = sucrette.orderInfo[rd].category != "hair" ? sucrette.orderInfo[rd].value : sucrette.avatar.hair;
        var img = composeCanvasUrl(T, size, V, sucrette.orderInfo[rd].layer);
        var ready = await preloadIMG(img);
        ctx.drawImage(ready, 0, 0, 1200, 1550);
    }
}

async function newCanvas(clase, info, img, i = new Number, p = "append") {
    if ($("#save-canvas").length == 0) {
        if (p == "append") {
            $("#asng-avatar").append(`<canvas class="${clase}" data-info="${info}" width="1200" height="1550"></canvas>`);
        } else {
            $("#asng-avatar").prepend(`<canvas class="${clase}" data-info="${info}" width="1200" height="1550"></canvas>`);
        }
        
        var ctx = document.getElementsByTagName("canvas")[i].getContext("2d");
        ready = await preloadIMG(img);
        ctx.drawImage(ready, 0, 0, 1200, 1550);

    } else {
        var ctx = document.getElementById("save-canvas").getContext("2d");
        ready = await preloadIMG(img);
        ctx.drawImage(ready, 0, 0, 1200, 1550);
    };
};

function checkCurrentItems(i, g, c) {

    // checkear en DB
    var check = [];
    switch (c) {
        case "eyebrows": case "eyes": case "mouth":
            check = avatar.collections[c].filter(v => {return v.groupId == g});
            break;
        default: 
            check = cloth.filter(v => {return v.groupId == g});
    };
    const s = check[0].security;
    const uID = `${i}-${s}`;
    

    var generalType = "cloth";
    if (c == "eyebrows" || c == "eyes" || c == "mouth") {
        generalType = "avatar";
        sucrette.avatar[c] = uID;  
        drawSucrette(cr, "update_avatar");
    
    } else if (c == "underwear") {
        let x = (sucrette.orderInfo).findIndex(v => v.category === c);
        if (sucrette.orderInfo[x].value != uID) {
            // reemplazar underwear
            sucrette.orderInfo[x].value = uID;
            drawSucrette(cr, "replace", x);
        };

    } else if (c == "wig") {
        check = sucrette.orderInfo.filter(v => {return v.category == "hair"})
        var layers = []
        if (check.length > 0) {
            // hay hair, reemplazar
            let b = (sucrette.orderInfo).findIndex(v => v.category == "hair" && v.layer == "back");
            let f = (sucrette.orderInfo).findIndex(v => v.category == "hair" && v.layer == "front");

            sucrette.orderInfo.splice(f, 1);
            sucrette.orderInfo.splice(b, 1);

            $('canvas').eq(f).remove();
            $('canvas').eq(b).remove();

            layers = cloth.filter(v => {return v.security == s});
            if (layers[0].multiLayered) {
                if (layers[0].layerBehavior == "normal") {
                    sucrette.orderInfo.unshift({"category":c, "layer":"back", "value":`${uID}`});
                    sucrette.orderInfo.push({"category":c, "layer":"front", "value":`${uID}`});

                    drawSucrette(cr, "new", 0);
                    drawSucrette(cr, "new");
                } else {
                    sucrette.orderInfo.push({"category":c, "layer":"back", "value":`${uID}`});
                    sucrette.orderInfo.push({"category":c, "layer":"front", "value":`${uID}`});
                    drawSucrette(cr, "new", sucrette.orderInfo - 2);
                    drawSucrette(cr, "new");
                }
            } else {
                sucrette.orderInfo.push({"category":c, "layer":null, "value":`${uID}`});
                drawSucrette(cr, "new");
            };

        } else {
            // hay wig, es duplicada ?
            let b = (sucrette.orderInfo).findIndex(v => v.category == c && v.layer == "back");
            let f = (sucrette.orderInfo).findIndex(v => v.category == c && v.layer == "front");
            
            if ((b + f) == -2) {
                // es mono
                //alert("hay mono");
                let mono = (sucrette.orderInfo).findIndex(v => v.category == c && v.layer == null);
                var A = sucrette.orderInfo.filter(v => {return v.value != null && (v.value).includes( s )});

                if (A.length == 1) {
                    // Reemplazar color
                    //alert("replace color");
                    sucrette.orderInfo[mono].value = uID;
                    drawSucrette(cr, "replace", mono);

                } else {
                    // Es nuevo o duplicado.
                    //alert("remove wig");
                    sucrette.orderInfo[mono].value == uID ? c = "hair" : ""; // Es duplicada, remover
                    sucrette.orderInfo.splice(mono, 1);
                    $('canvas').eq(mono).remove();

                    // Añadir nuevo
                    layers = cloth.filter(v => {return v.security == s});
                    if (layers[0].multiLayered) {
                        // Nuevo multi
                        if (layers[0].layerBehavior == "normal") {
                            sucrette.orderInfo.unshift({"category":c, "layer":"back", "value":`${uID}`});
                            sucrette.orderInfo.push({"category":c, "layer":"front", "value":`${uID}`});
                            drawSucrette(cr, "new", 0);
                            drawSucrette(cr, "new");
                        }

                    } else {
                        // Nuevo mono
                        sucrette.orderInfo.push({"category":c, "layer":null, "value":`${uID}`});
                        drawSucrette(cr, "new");
                    }
                };

            } else {
                // es multi
                //alert("hay multi");
                var A = sucrette.orderInfo.filter(v => {return v.value != null && v.value == uID });

                if (A.length > 0) {
                    // Reemplazar color
                    //alert("replace color");
                    sucrette.orderInfo[b].value = uID;
                    sucrette.orderInfo[f].value = uID;
                    drawSucrette(cr, "replace", b);
                    drawSucrette(cr, "replace", f);

                } else {
                    // Es nuevo o duplicado.
                    //alert("remove wig");
                    if (sucrette.orderInfo[f].value == uID) {c = "hair"; uID = "auto"} // Es duplicada, remover
                    sucrette.orderInfo.splice(f, 1);
                    sucrette.orderInfo.splice(b, 1);

                    $('canvas').eq(f).remove();
                    $('canvas').eq(b).remove();

                    layers = cloth.filter(v => {return v.security == s});
                    if (layers[0].multiLayered) {
                        if (layers[0].layerBehavior == "normal" || c == "hair") {
                            sucrette.orderInfo.unshift({"category":c, "layer":"back", "value":`${uID}`});
                            sucrette.orderInfo.push({"category":c, "layer":"front", "value":`${uID}`});
                            drawSucrette(cr, "new", 0);
                            drawSucrette(cr, "new");
                            
                        } else {
                            sucrette.orderInfo.push({"category":c, "layer":"back", "value":`${uID}`});
                            sucrette.orderInfo.push({"category":c, "layer":"front", "value":`${uID}`});
                            drawSucrette(cr, "new", (sucrette.orderInfo.length - 2));
                            drawSucrette(cr, "new");
                        };
                    } else {
                        sucrette.orderInfo.push({"category":c, "layer":null, "value":`${uID}`});
                        drawSucrette(cr, "new");
                    }
                };
            };
        };
        
    } else {
        // General cloth
        check = sucrette.orderInfo.filter(v => v.value == uID);
        var temp = cloth.filter(v => v.security == s);

        if (check.length > 0) {
            // Ya existe, eliminar
            if (temp[0].multiLayered) {
                let f = (sucrette.orderInfo).findIndex(v => v.value == uID && v.layer == "front");
                let b = (sucrette.orderInfo).findIndex(v => v.value == uID && v.layer == "back");

                sucrette.orderInfo.splice(f, 1);
                sucrette.orderInfo.splice(b, 1);

                $("canvas").eq(f).remove();
                $("canvas").eq(b).remove();
            } else {
                let x = (sucrette.orderInfo).findIndex(v => v.value == uID);
                sucrette.orderInfo.splice(x, 1);
                $("canvas").eq(x).remove();
            }

        } else {
            // Es reemplazo?
            check = sucrette.orderInfo.filter(v => {return v.value != null && (v.value).includes( s )});
            if (check.length > 0) {
                // es reemplazo
                if (temp[0].multiLayered) {
                    let V = check[0].value;

                    let f = (sucrette.orderInfo).findIndex(v => v.value == V && v.layer == "front");
                    let b = (sucrette.orderInfo).findIndex(v => v.value == V && v.layer == "back");

                    sucrette.orderInfo[f].value = uID;
                    sucrette.orderInfo[b].value = uID;

                    drawSucrette(cr, "replace", f);
                    drawSucrette(cr, "replace", b);

                } else {
                    let V = check[0].value;
                    let x = (sucrette.orderInfo).findIndex(v => v.value == V && v.layer == null);
                    sucrette.orderInfo[x].value = uID;
                    drawSucrette(cr, "replace", x);
                };
            } else {
                // es nuevo
                if (temp[0].multiLayered) {
                    if (temp[0].layerBehavior == "normal") {
                        sucrette.orderInfo.unshift({"category":c, "layer":"back", "value":`${uID}`});
                        sucrette.orderInfo.push({"category":c, "layer":"front", "value":`${uID}`});
                        drawSucrette(cr, "new", 0);
                        drawSucrette(cr, "new");

                    } else {
                        sucrette.orderInfo.push({"category":c, "layer":"back", "value":`${uID}`});
                        sucrette.orderInfo.push({"category":c, "layer":"front", "value":`${uID}`});
                        drawSucrette(cr, "new", sucrette.orderInfo.length - 2);
                        drawSucrette(cr, "new");
                    };

                } else {
                    sucrette.orderInfo.push({"category":c, "layer":null, "value":`${uID}`});
                    drawSucrette(cr, "new");

                }

            }
        }

    }

    drawZIndex();
    itemEquipped(i, g);

}

function drawZIndex() {
    $("#z-index-content").html('');
    let z = 0;

    for (i = sucrette.orderInfo.length-1; i >= 0; i--) {
        let c = sucrette.orderInfo[i].category;
        let l = sucrette.orderInfo[i].layer;
        let v = sucrette.orderInfo[i].value;

        $("#z-index-content").append(`<div class="cdk-drag item${c == "avatar" ? " drag-disabled" : ""}" data-index="${i}"></div>`);
        if (c != "avatar") {
            $("#z-index-content .item").eq(z).append('<div class="z-index-move"><div class="zim move-up"></div><div class="zim move-down"></div></div>');
        }


        if (c != "avatar" && c != "underwear" && c != "hair") $("#z-index-content .item").eq(z).append('<div class="remove"></div>');

        let img = "";
        if (c != "hair" && c != "avatar") {
            img = composeHangerUrl(v.split("-")[0], v.split("-")[1]);
        } else if (c == "hair") {
            img = composeHangerUrl(sucrette.avatar.hair, null, c);
        } else if (c == "avatar") {
            img = composeHangerUrl(sucrette.avatar.customSkin != null ? sucrette.avatar.customSkin : sucrette.avatar.skin, null, "skin");
        };

        $("#z-index-content .item").eq(z).append(`<img resolution="${hr}" src="${img}">`);

        if (l != null) {
            let p = window.localStorage.getItem("personality");

            if (l == "front") {
                $("#z-index-content .item").eq(z).append(`<div class="front-icon"><img src="assets/personalization/z-index/top-${p}.svg"</div>`);
                
            } else if (l == "back") {
                $("#z-index-content .item").eq(z).append(`<div class="back-icon"><img src="assets/personalization/z-index/back-${p}.svg"</div>`);
            };
        };

        z++;


    };
}
// Move elements
function moveItems(z, d) {
    let c1 = sucrette.orderInfo[z].category;
    let l1 = sucrette.orderInfo[z].layer;
    let v1 = sucrette.orderInfo[z].value;

    if (d == "down" && z != 0) {
        let c2 = sucrette.orderInfo[z - 1].category;
        let l2 = sucrette.orderInfo[z - 1].layer;
        let v2 = sucrette.orderInfo[z - 1].value;

        if (c1 == "underwear") {
            // si es underwear no puede bajar avatar
            if (c2 != "avatar") arrayMove(z, z - 1);

        } else if (l1 == "front" && l2 == "back") {
            // si es front no puede bajar back
            if (v1 != v2) arrayMove(z, z - 1);

        } else { 
            arrayMove(z, z - 1);
        };

    } else if (d == "up" && z != (sucrette.orderInfo.length - 1)) {
        let c2 = sucrette.orderInfo[z + 1].category;
        let l2 = sucrette.orderInfo[z + 1].layer;
        let v2 = sucrette.orderInfo[z + 1].value;
        // si back no puede subir front
        if (l1 == "back" && l2 == "front") {
            if (v1 != v2) arrayMove(z, z + 1);
        } else {
            arrayMove(z, z + 1);
        };
    };

    drawZIndex();
};

function arrayMove(from, to) {
    let item = sucrette.orderInfo[from];
    sucrette.orderInfo.splice(from, 1);
    sucrette.orderInfo.splice(to, 0, item);
    moveCanvas(from, to);
};

function moveCanvas(from, to) {
    let elmnt = document.getElementsByTagName("canvas")[from];
    if (from > to) { // baja
        elmnt.parentNode.insertBefore(elmnt, elmnt.previousElementSibling);
    } else { // sube
        elmnt.parentNode.insertBefore(elmnt.nextElementSibling, elmnt);
    };
}

// Delete elements
function removeItem(z) {
    let c = sucrette.orderInfo[z].category;
    let l = sucrette.orderInfo[z].layer;
    let v = sucrette.orderInfo[z].value;

    if (c != "underwear" && c != "hair" && c != "avatar" ) {
        if (l == null) {
            // Solo una capa, eliminar
            sucrette.orderInfo.splice(z, 1);
            $("canvas").eq(z).remove();

        } else {
            // Varias capas
            let z2 = "";
            (l == "back") ? 
                z2 = sucrette.orderInfo.findIndex(x => {return (x.value == v && x.layer == "front")}) 
                : z2 = sucrette.orderInfo.findIndex(x => {return (x.value == v && x.layer == "back")});

            if (z > z2) {
                sucrette.orderInfo.splice(z, 1);
                $("canvas").eq(z).remove();
                sucrette.orderInfo.splice(z2, 1);
                $("canvas").eq(z2).remove();
            } else {
                sucrette.orderInfo.splice(z2, 1);
                $("canvas").eq(z2).remove();
                sucrette.orderInfo.splice(z, 1);
                $("canvas").eq(z).remove();
            };

            if (c == "wig") {
                // añadir hair
                alert("Añadir cabello");
                sucrette.orderInfo.push({"category":"hair", "layer":"back", "value":"auto"});
                drawSucrette(cr, "new");
                sucrette.orderInfo.push({"category":"hair", "layer":"front", "value":"auto"});
                drawSucrette(cr, "new");
            };
        };

        drawZIndex();
    };
}

function addToSucrette(c, l, v, u = false) { // PENDIENTE
    if (!u) {
        sucrette.orderInfo.push({"category":c, "layer":l, "value":v});
    } else {
        sucrette.orderInfo.unshift({"category":c, "layer":l, "value":v});
    }
}

function itemEquipped(i, g) {
    $('.declinations-panel .item-outline').removeClass('equipped');
    $(`.asng-cloth[data-item="${g}-${i}"] .item-outline`).addClass('equipped');

}

function resetSucrette() {
    let u = sucrette.orderInfo.filter(v => {return v.category == "underwear"});
    sucrette.orderInfo.length = 0;

    sucrette.orderInfo.push({"category":"avatar", "layer":null, "value":null});
    sucrette.orderInfo.push({"category":u[0].category, "layer":u[0].layer, "value":u[0].value});
    sucrette.orderInfo.push({"category":"hair", "layer":"back", "value":"auto"});
    sucrette.orderInfo.push({"category":"hair", "layer":"front", "value":"auto"});
    drawSucrette(cr, "load");
    drawZIndex();
}

function drawSavePopUp(w, h) {
    $("body").append(`<div id="overlay-popup"><div id="canvas-container"><canvas width="${w}" height="${h}" id="save-canvas"></canvas></div></div>`);
    $("#canvas-container").append(`<div class="button close"><i class="fa-solid fa-xmark"></i></div>`);

    drawSucrette("hd", "load");
};

$(function () {
    $("#asng-menu-settings").click(function() {
        $(".asng-settings-panel").css("left", 0);
    });

    // USER SETTINGS
    $(".personality-icon").click(function() {
        let p = ($(this).attr("class")).replace("personality-icon ", "");
        window.localStorage.setItem("personality", p);
        customTheme();
    });

    $(".quality-options .choice").click(function() {
        let info = $(this).attr("id");
        if(info.split("-")[0] == "icon") hr = info.split("-")[1];
        if(info.split("-")[0] == "canvas") cr = info.split("-")[1];
        userSettings();
        if(info.split("-")[0] == "canvas") drawSucrette();
    });

    $(".asng-toggle-switch > label").click(function() {
        let clase = $(this).attr("class");
        clase == "off" ? rt = "night" : rt = "day";
        userSettings();
    });


    // END USER SETTINGS

    $(".close-button").click(function() {
        $(".asng-settings-panel").removeAttr("style");
    });

    $(".category-list-current-category").click(function() {
        var status = $(".list").attr("class");
        toggleCategoryMenu(status);
        
    });

    $(document).on('click', function (event) {
        if ($(".list.open").length == 1) {
            if (!$(event.target).closest('.list').length && !$(event.target).closest('.category-list-current-category').length) {
                toggleCategoryMenu("open");
            };
        };
    });

    $(".category-list-item").on('click', function() {
        var clase = $(this).attr("class");
        if (!clase.includes("current")) {
            $(".category-list-item.current").removeClass("current");
            $(this).addClass("current");
            $(".current-category").text(getCategoryName($(this).attr("data-category")));
            toggleCategoryMenu("open");
            drawCategory($(this).attr("data-category"));
            drawAvatarZone($(this).attr("data-category"));
        };
    });

    $("#asng-zone-selector path").click(function() {
        let zone = ($(this).attr("id")).split("-")[1];
        $(".category-list-item.current").removeClass("current");
        drawAvatarZone("auto", zone);
    });

    $(".items-container").on("click", ".asng-cloth.grouped", function() {

        if (!$(this).attr("class").includes(" selected")) {
            removeDeclinationPanel();
            $(this).addClass("selected");
            $(".asng-cloth").not(".selected").addClass("not-selected");
            var item = $(this).attr("data-item");
            drawDeclinationPanel($(".asng-cloth").index(this))
            drawCategory($(".category-list-item.current").attr("data-category"), parseInt(item.split("-")[0]))

        } else {
            removeDeclinationPanel();
        };
    });

    $(".items-container").on("click", ".asng-cloth.item", function() {
        let g = $(this).attr("data-item").split("-")[0];
        let i = $(this).attr("data-item").split("-")[1];
        let c = $(this).attr("data-category");

        checkCurrentItems(i, g, c);
    });

    $(".items-container").on("click", ".close", function() {
        removeDeclinationPanel();
    });

    $(".categories").on("click", ".category", function() {
        var newCategory = ($(this).attr("id")).split("-")[3];

        // actualizar lista y nombre de categoria
        $(".category-list-item.current").removeClass("current");
        
        if (newCategory != "general") {
            $(`.category-list-item[data-category="${newCategory}"]`).addClass("current");
            $(".current-category").text(getCategoryName($(".category-list-item.current").attr("data-category")));

            drawCategory(newCategory);

            if (newCategory == "underwear" || newCategory == "dress" || newCategory == "waist") {
                // Conservar zona
                let currentZ = ($(".avatar-personalization").attr("class")).split(" ")[1];
                drawAvatarZone(newCategory, currentZ);
            } else {
                drawAvatarZone(newCategory);
            }

        } else {
            $(`.category-list-item[data-category="tattoo"]`).addClass("current");
            $(".current-category").text(getCategoryName($(".category-list-item.current").attr("data-category")));

            drawCategory("tattoo");
            drawAvatarZone("tattoo", "general");
        }

    });

    // move z index
    $("#asng-z-index").on("click", ".move-up", function() {
        let z = parseInt( $(this).parent().parent().data("index") );
        moveItems(z, "up");
    });

    $("#asng-z-index").on("click", ".move-down", function() {
        let z = parseInt( $(this).parent().parent().data("index") );
        moveItems(z, "down");
    });

    $("#asng-z-index").on("click", ".remove", function() {
        let z = parseInt( $(this).parent().data("index") );
        removeItem(z);
    });

    // middle menu

    $(".shortcut.cloth").click(function() {
        $(".shortcut").removeClass("active");
        $(".sub-link").removeClass("active");
        $(this).addClass("active");

        $("#asng-avatar-part-color-list-panel").hide();
        $("#asng-avatar-item-list-panel").show();
        $(".avatar-personalization").show();

        drawSucrette(cr, "load");
        drawZIndex();
    });

    $("#sub-link-z-index").click(function() {
        let c = $(this).attr("class");
        let a = $(".shortcut.cloth").attr("class");
        if (c.includes("active")) {
            $(this).removeClass("active");
            $("#asng-z-index").fadeOut(100);

        } else {
            $(".shortcut").removeClass("active force-clickable");
            $(".shortcut.cloth").addClass("active");
            $(".sub-link").removeClass("active");
            $(this).addClass("active");
    
            $("#asng-avatar-part-color-list-panel").hide();
            $("#asng-avatar-item-list-panel").show();
            $(".avatar-personalization").show();
            $("#asng-z-index").fadeIn(100);

            if (a.includes("force-clickable")) {
                drawSucrette(cr, "load");
            };
        }

    });

    $("#sub-link-avatar-part").click(function() {
        $(".shortcut").removeClass("active");
        $(".shortcut.cloth").addClass("active force-clickable");
        $(".sub-link").removeClass("active");
        $(this).addClass("active");

        $("#asng-avatar-item-list-panel").hide();
        $(".avatar-personalization").hide();
        $("#asng-z-index").fadeOut(100);
        $("#asng-avatar-part-color-list-panel").css("display","flex");
        drawSucrette(cr, "basics");
        drawZIndex();
    });

    $("#sub-link-delete").click(function() {
        $(".sub-link").removeClass("active");
        $("#asng-z-index").fadeOut(100);
        resetSucrette();
        drawZIndex();
    });

    // avatar color menu

    $(".eye-color .color").click(function() {
        sucrette.avatar.eyesColor = $(this).data("color");
        $(".eye-color .color").removeClass("equipped");
        $(this).addClass("equipped");
        drawSucrette(cr, "basics");
        drawZIndex();
    });

    $(".hair-color .color").click(function() {
        sucrette.avatar.hair = $(this).data("color");
        $(".hair-color .color").removeClass("equipped");
        $(this).addClass("equipped");
        drawSucrette(cr, "basics");
        drawZIndex();
    });

    $(".skin-color .color").click(function() {
        sucrette.avatar.skin = $(this).data("color");
        $(".skin-color .color").removeClass("equipped");
        $(this).addClass("equipped");
        drawSucrette(cr, "basics");
        drawZIndex();
    });


    // ZOOM + SAVE
    $(".asng-personalization-view .zoom").click(function() {
        let clase = $(this).attr("class");
        if (clase.includes("enabled")) {
            $(this).removeClass("enabled");
            $(".left-panel-container").fadeIn(100);
            $(".center-container").fadeIn(100);
            $(".avatar-personalization").fadeIn(100);
        } else {
            $(this).addClass("enabled");
            $(".left-panel-container").fadeOut(100);
            $(".center-container").fadeOut(100);
            $(".avatar-personalization").fadeOut(100);
        };
    });

    $(".asng-personalization-view .save").click(function() {
        drawSavePopUp(1200, 1550);
    });

    $('body').on("click", "#canvas-container .close", function() {
        $("#overlay-popup").remove();
        drawSucrette();
    });

});

function getCategoryName(arg) {
    if (arg == "hat") return "Sombreros";
    if (arg == "wig") return "Pelucas";
    if (arg == "eyebrows") return "Cejas";
    if (arg == "faceAccessory") return "Accesorios cara";
    if (arg == "earring") return "Pendientes";
    if (arg == "expression") return "Expresiones";
    if (arg == "makeup") return "Maquillaje";
    if (arg == "eyes") return "Ojos";
    if (arg == "mouth") return "Bocas";
    if (arg == "neckAccessory") return "Collares";
    if (arg == "top") return "Partes de arriba";
    if (arg == "dress") return "Vestidos";
    if (arg == "jacket") return "Chaquetas";
    if (arg == "waist") return "Cinturones";
    if (arg == "underwear") return "Ropa interior";
    if (arg == "gloves") return "Guantes";
    if (arg == "bag") return "Bolsos";
    if (arg == "armAccessory") return "Joyas brazo";
    if (arg == "handNailPolish") return "Esmalte manos";
    if (arg == "pants") return "Pantalones";
    if (arg == "skirt") return "Faldas";
    if (arg == "shoes") return "Zapatos";
    if (arg == "socks") return "Calcetines";
    if (arg == "legAccessory") return "Joyas piernas";
    if (arg == "footNailPolish") return "Esmalte pies";
    if (arg == "skin") return "Pieles";
    if (arg == "tattoo") return "Tatuajes";
    if (arg == "other") return "Otros";
};

function composeHangerUrl (id, e, type = "cloth", s = hr) {
    let url = `https://assets.corazondemelon-newgen.es/`;

    if (type == "cloth") {
        url += `${type}/hanger/${s}/${id}-${e}.png`;
    } else {
        url += `avatar-part/${type}/hanger/${s}/`;

        switch (type) {
            case "mouth": url+= `${id}-${e}.png`;break;
            case "eyebrows": url+= `${id}-hair_${sucrette.avatar.hair}-${e}.png`;break;
            case "eyes": url+= `${id}-eyes_${sucrette.avatar.eyesColor}-${e}.png`;break;
            case "hair": url+= `${id}.png`;break;
            case "skin": url = `https://assets.corazondemelon-newgen.es/avatar-part/${type}/full/${s}/${id}.png`;break;
        };
    }
    return url;
}

function composeCanvasUrl(t, s = cr, d, l = null) {
    let url = "https://assets.corazondemelon-newgen.es/";
    if (t == "cloth" && l == null) {
        url += `${t}/full/${s}/${d}.png`;
    } else {
        url += `${t}/full/${s}/${d.split("-")[0]}-${l}-${d.split("-")[1]}.png`;
    };

    return url;
}

function composeAvatarUrl(c, s, d, mp = null) {
    let url = "https://assets.corazondemelon-newgen.es/avatar-part/";

    if (c == "skin") {
        url += `${c}/full/${s}/${d}.png`;

    } else if (c == "hair") {
        url += `${c}/full/${s}/${d}-${mp}.png`;

    } else {
        let i = sucrette.avatar.expressionPreset;
        let e = avatar.expressionsPresets[i];
        
        if (c.includes("eyes")) {
            url += `eyes/full/${s}/${(d.split("-")[0])}-`;
            
            if (c.includes("skin")) {
                let b = (sucrette.avatar.customSkin == null) ? sucrette.avatar.skin : "no"; // revisar!
                url += `body_${b}-${e[1]}-${(d.split("-")[1])}.png`;
            } else {
                let ec = sucrette.avatar.eyesColor;
                url += `eyes_${ec}-${e[1]}-${(d.split("-")[1])}.png`;
            };


        } else if (c.includes("eyebrows")) {
            url += `eyebrows/full/${s}/${(d.split("-")[0])}-`;

            if (c.includes("skin")) {
                let b = (sucrette.avatar.customSkin == null) ? sucrette.avatar.skin : "no"; // revisar!
                url += `body_${b}-${e[0]}-${(d.split("-")[1])}.png`;
            } else {
                let hc = sucrette.avatar.hair;
                url += `hair_${hc}-${e[0]}-${(d.split("-")[1])}.png`;
            };


        } else if (c == "mouth") {
            let b = (sucrette.avatar.customSkin == null) ? sucrette.avatar.skin : "no"; // revisar!
            url += `mouth/full/${s}/${(d.split("-")[0])}-body_${b}-${e[2]}-${(d.split("-")[1])}.png`;
        }
    }

    return url;

}

function fillCounter() {
    var sum = 0;
    for (i = 0; i < cloth.length; i++) {
        sum += cloth[i].variations.length;
    };

    for (a = 0; a < avatar.collections.eyebrows.length; a++) {
        sum += avatar.collections.eyebrows[a].variations.length;
    }

    for (a = 0; a < avatar.collections.eyes.length; a++) {
        sum += avatar.collections.eyes[a].variations.length;
    }

    for (a = 0; a < avatar.collections.mouth.length; a++) {
        sum += avatar.collections.mouth[a].variations.length;
    }

    $(".shortcut.cloth p.counter").text(sum);
}

// global variables
var cloth = [], avatar = [];
let hr = window.localStorage.getItem("hanger_res");
let cr = window.localStorage.getItem("canvas_res");
let rt = window.localStorage.getItem("room_time");