$(document).ready(function() {
	var page = checkURL();
	drawPage(page);
});

function checkURL() {
	var url = window.location.search;

	if (url != "") {
		if (url.includes("general")) {
			return "general";
		} else if (url.includes("form")) {
			return "form";
		} else if (url.includes("wanted")) {
			return "wanted";
		} else {
			history.pushState(null, "", "?q=general");
			return "general";
		};

	} else {
		history.pushState(null, "", "?q=general");
		return "general";
	};

};

function drawPage(type) {
	$("#page-dynamic-submit").html('');

	if (type == "general") {
		$("#page-dynamic-submit").append('<div class="section-page info"></div>');
		$(".section-page.info").append('<div style="position:  relative; display: inline-block;"><h3><div class="paper-clip-title"><div class="title-container"><div class="trombone"></div><span>¡Ayúdame a completar el armario!</span></div></div></h3></div>');
		$(".section-page.info").append('<div class="page-main-content"><div class="card"><p>Como bien sabemos, el vestidor apenas inicia y por ello aún faltan varias prendas. Actualmente se buscan los conjuntos de episodios (indicados en la pestaña "Se busca") y algunos regalos del hada que no han sido indicados.</p><p>Si tienes alguna prenda que actualmente no está en el vestidor, te invito a completar el formulario ubicado en la pestaña con el mismo nombre.</p><p>El formulario está abierto para que organices toda la información como mejor te parezca, solo asegúrate que la información sea correcta.</p></div></div>');

		$("#page-dynamic-submit").append('<div class="section-page requirement"></div>');
		$(".section-page.requirement").append('<div style="position: relative; display: inline-block;"><h3><div class="paper-clip-title"><div class="title-container"><div class="trombone"></div><span>Información requerida</span></div></div></h3></div>');
		$(".section-page.requirement").append('<div class="page-main-content"><div class="card"><ul><li>Temporada a la que pertenece: Instituto / Universidad / Amor</li><li>Nombres de las prendas.</li><li>Categorías de las prendas.</li><li>Enlaces de sus variaciones de colores.</li></ul></div></div>');

		$(".tab").eq(0).addClass("active");

	} else if (type == "form") {
		$("#page-dynamic-submit").append('<div class="section-page form"></div>');
		$(".section-page.form").append('<div style="position:  relative; display: inline-block;"><h3><div class="paper-clip-title"><div class="title-container"><div class="trombone"></div><span>Completa el formulario</span></div></div></h3></div>');
		$(".section-page.form").append('<div class="page-main-content" style="text-align: center;"><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfQlhXLEa37uIz2UxDZhwVOoGtgzXpEJr0ylJZbnK2xRU2LqA/viewform?embedded=true" width="640" height="500" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe></div>');

		$(".tab").eq(2).addClass("active");

	} else if (type == "wanted") {
		$("#page-dynamic-submit").append('<div class="section-page wanted"></div>');
		$(".tab").eq(1).addClass("active");
		
		// ===========================================
		// Season 1
		// ===========================================

		$(".section-page.wanted").append('<div style="position:  relative; display: inline-block;"><h3><div class="paper-clip-title"><div class="title-container"><div class="trombone"></div><span>Conjuntos de Instituto</span></div></div></h3></div>');
		$(".section-page.wanted").append('<div class="page-main-content"><div class="card"><p>Se buscan todas las prendas y accesorios de estos conjuntos, solo en estos colores (aporta solo los enlaces de las imagenes):</p><div class="sets s1"></div></div></div>');

		var arrayS1 = [];

		if (arrayS1.length > 0) {
			for (i = 0; i < arrayS1.length; i++) {
				var name = arrayS1[i];
				name = name.replace("../assets/img/sets/s1/", "");
				name = name.replace(".png", "");
				name = name.replace(/_/g, " ");
				$(".sets.s1").append('<a href="' + arrayS1[i] + '" target="_blank" title="' + name + '"><img style="width: 20%;" src="' + arrayS1[i] + '"></a>');
			};	
		} else {
			$(".card p").eq(0).html('<i>De momento nada.</i>');
		}

		// ===========================================
		// Season 2
		// ===========================================

		$(".section-page.wanted").append('<div style="position:  relative; display: inline-block;"><h3><div class="paper-clip-title"><div class="title-container"><div class="trombone"></div><span>Conjuntos de Universidad</span></div></div></h3></div>');
		$(".section-page.wanted").append('<div class="page-main-content"><div class="card"><p>Se buscan todas las prendas y accesorios de estos conjuntos, solo en estos colores (aporta solo los enlaces de las imagenes):</p><div class="sets s2"></div></div></div>');

		var arrayS2 = [];

		if (arrayS2.length > 0) {
			for (i = 0; i < arrayS2.length; i++) {
				var name = arrayS2[i];
				name = name.replace("../assets/img/sets/s2/", "");
				name = name.replace(".png", "");
				name = name.replace(/_/g, " ");
				$(".sets.s2").append('<a href="' + arrayS2[i] + '" target="_blank" title="' + name + '"><img style="width: 20%;" src="' + arrayS2[i] + '"></a>');
			};	
		} else {
			$(".card p").eq(1).html('<i>De momento nada.</i>');
		};


		// ===========================================
		// Season 3
		// ===========================================

		$(".section-page.wanted").append('<div style="position:  relative; display: inline-block;"><h3><div class="paper-clip-title"><div class="title-container"><div class="trombone"></div><span>Conjuntos de Amor</span></div></div></h3></div>');
		$(".section-page.wanted").append('<div class="page-main-content"><div class="card"><p>Solo se buscan las prendas en estos colores específicos:</p><div class="sets s3"></div></div></div>');

		var arrayS3 = [];

		if (arrayS3.length > 0) {
			for (i = 0; i < arrayS3.length; i++) {
				var name = arrayS2[i];
				name = name.replace("../assets/img/sets/s3/", "");
				name = name.replace(".png", "");
				name = name.replace(/_/g, " ");
				$(".sets.s3").append('<a href="' + arrayS3[i] + '" target="_blank" title="' + name + '"><img style="width: 20%;" src="' + arrayS3[i] + '"></a>');
			};	
		} else {
			$(".card p").eq(2).html('<i>De momento nada.</i>');
			//$(".card p").eq(2).html('Se buscan TODOS los conjuntos de episodios (del 8 al 15) en todos los colores. Será necesario aportarlos con sus nombres, categorías y enlaces.');
		};
	};
};

$(function() {
	$(".tab").click(function() {
		var clase = $(this).attr("class");

		if (!clase.includes("active")) {
			$(".tab.active").removeClass("active");
			$(this).addClass("active");

			var string = $(this).find("span").text();

			if (string == "General") {
				history.pushState(null, "", "?q=general");
				drawPage("general");
			} else if (string == "Formulario") {
				history.pushState(null, "", "?q=form");
				drawPage("form");
			} else if (string == "Se busca") {
				history.pushState(null, "", "?q=wanted");
				drawPage("wanted");
			};
		};
	});

});