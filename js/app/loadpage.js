define(["jquery", "app/menu"], function () {

	document.getElementById("menu").addEventListener("click", function(e) {
		if(e.target && e.target.nodeName == "A") {
			
			$('#menu a').removeClass('active');
			e.target.setAttribute("class","active");

			$.get( e.target.id+".html", function( data ) {
				$( ".result" ).html( data );
			});

		} 
		
	});

});