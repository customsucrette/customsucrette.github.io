$(document).ready(function() {
    $(".version").text("v1.4.9");
});

function currentPage(name) {
    if (name == "wardrobe") {
        $(".asng-menu .menu .wave .header").css("height", "136px");
        $("#asng-menu-player").addClass("force-active");
    } else if (name == "gallery") {
        $(".asng-menu .menu .wave .header").css("height", "276px");
        $("#asng-menu-gallery").addClass("force-active");
    } else if(name == "checker") {
        $(".asng-menu .menu .wave .header").css("height", "346px");
        $("#asng-menu-checker").addClass("force-active");
    };
};

function customTheme() {
    let p = window.localStorage.getItem("personality");
    if (p == null) p = "sweet";
    window.localStorage.setItem("personality", p);

    $("body").attr("class", `personality-${p}`);
    $(".personality-icon").removeClass("active");
    $(`.personality-icon.${p}`).addClass("active");
    $(".filters-button").attr("class", `filters-button ${p}`);
    $(".filters-button img").attr("src", `assets/personalization/icon/filter-${p}.png`);
    $(".filter-by-name-input img").attr("src", `assets/icon/zoom-${p}.svg`);

    $("#sub-link-favorite-outfit-img").attr("src", `assets/personalization/icon/favorite-outfit-${p}.png`);
    $("#sub-link-z-index-img").attr("src", `assets/personalization/icon/z-index-${p}.png`);
    $("#sub-link-avatar-part-img").attr("src", `assets/personalization/icon/avatar-part-${p}.png`);
    $(".sub-link-delete-img").attr("src", `assets/personalization/icon/delete-${p}.png`);
    
    $("#asng-z-index .front-icon img").attr("src", `assets/personalization/z-index/top-${p}.svg`);
    $("#asng-z-index .back-icon img").attr("src", `assets/personalization/z-index/back-${p}.svg`);

    $(".room-category.background img").attr("src", `assets/personalization/categories/background-${p}.svg`)
    
};

function userSettings() {
    if (hr == null) hr = "sd";
    if (cr == null) cr = "md";
    if (rr == null) rr = "sd";
    if (rt == null) rt = "day";
    if (re == null) re = "enabled";

    window.localStorage.setItem("hanger_res", hr);
    window.localStorage.setItem("canvas_res", cr);
    window.localStorage.setItem("room_res", rr);
    window.localStorage.setItem("room_time", rt);
    window.localStorage.setItem("room_effects", re);

    $(".option-picker .choice").removeClass("active");
    $(`#icon-${hr}`).addClass("active");
    $(`#canvas-${cr}`).addClass("active");
    $(`#room-${rr}`).addClass("active");

    if (rt == "day") {
        $(".asng-toggle-switch.alternate-time label").addClass("off");
        $(".graphics .asng-toggle-switch.alternate-time .slider").addClass("off");
    } else {
        $(".asng-toggle-switch.alternate-time label").removeClass("off");
        $(".graphics .asng-toggle-switch.alternate-time .slider").removeClass("off");
    };

    // Fondo mientras carga todo
    if ((window.location.href).includes("wardrobe.html")) {
        $(".asng-room").css("background-image", `url(${composeRoomUrl("background", sucrette.room.background.split("-")[0], sucrette.room.background.split("-")[1], "full", rr)})`);
    } else {
        $(".asng-room").css("background-image", "url(https://forum.corazondemelon-newgen.es/resources/forum/image/background.webp)");
    };
    

    if (re == "disabled") {
        $(".asng-toggle-switch.alternate-filters label").addClass("off");
        $(".graphics .asng-toggle-switch.alternate-filters .slider").addClass("off");
    } else {
        $(".asng-toggle-switch.alternate-filters label").removeClass("off");
        $(".graphics .asng-toggle-switch.alternate-filters .slider").removeClass("off");
    };

    if ((window.location.href).includes("wardrobe.html")) {
        $("#pet-base").attr("src", composePetUrl("full", null, null));
        if (sucrette.pet.outfit != null) $("#pet-outfit").attr("src", composePetUrl("full", (sucrette.pet.outfit).split("-")[0], (sucrette.pet.outfit).split("-")[1]));
    };
};


$(function () {
    
    $("#asng-menu-settings").click(function() {
        $(".asng-settings-panel").css("left", 0);
    });

    $(".close-button").click(function() {
        $(".asng-settings-panel").removeAttr("style");
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
        if(info.split("-")[0] == "room") rr = info.split("-")[1];
        userSettings();
        if ((window.location.href).includes("wardrobe.html")) {
            if(info.split("-")[0] == "canvas") drawSucrette();
            if(info.split("-")[0] == "room") drawRoomCanvas();
        };
    });

    $(".asng-toggle-switch.alternate-time > label").click(function() {
        let clase = $(this).attr("class");
        clase == "off" ? rt = "night" : rt = "day";
        userSettings();
        if ((window.location.href).includes("wardrobe.html")) {
            drawRoomCanvas();
        };
    });

    $(".asng-toggle-switch.alternate-filters > label").click(function() {
        let clase = $(this).attr("class");
        clase == "off" ? re = "enabled" : re = "disabled";
        userSettings();
        if ((window.location.href).includes("wardrobe.html")) {
            drawRoomCanvas();
        };
    });

    // END USER SETTINGS
});

// global variables
let hr = window.localStorage.getItem("hanger_res");
let cr = window.localStorage.getItem("canvas_res");
let rr = window.localStorage.getItem("room_res");
let rt = window.localStorage.getItem("room_time");
let re = window.localStorage.getItem("room_effects");