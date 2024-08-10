$(document).ready(function() {
    //drawPopUpNewGen();
});

// if (location.protocol != 'https:') {
//     location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
// }

function drawPopUpNewGen() {
    let ng = window.localStorage.getItem("newgen-popup");
    (ng == null) ? window.localStorage.setItem("newgen-popup", 1) : window.localStorage.setItem("newgen-popup", ng + 1);
    if (ng <= 6 || !(window.location.href).includes(".io/v")) {
        $("body").append('<div class="overlay-container"></div>');
        $(".overlay-container").append('<div id="popup-newgen"><div class="button-close"><span class="fa fa-times"></span></div></div>');
        if ((window.location.href).includes(".io/v")) {
            $("#popup-newgen").append('<a href="../ng/wardrobe.html"><img src="../assets/newgen-beta.png"></a>');
        } else {
            $("#popup-newgen").append('<a href="ng/wardrobe.html"><img src="assets/newgen-beta.png"></a>');
        }
        $("#popup-newgen").attr("style", "width: 355px; height: 355px; margin: auto; top: 0; bottom: 0; position: absolute; text-align: center; left: 0;right: 0;");
        $("html").css("overflow", "hidden");
    };    
};

$(function() {
    $("body").on("click", ".button-close", function() {
        $(".overlay-container").remove();
        $("html").css("overflow", "auto");
    });
});