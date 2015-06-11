// define(function (require) {
define(["jquery", "app/loadpage"], function ($, loadpage) {
	"use strict";

	var dosegnav = function(){

		//create seg nav
			createElement("a","next", "Next page");
			createElement("a","prev", "Previous page");

			function createElement(type, id, text){
				var el=document.createElement(type);
				setAttributes(el, {"href": "#", "id": id, "class": "hidden"});
				el.innerHTML = text;
				document.body.appendChild(el);
			}

			function setAttributes(el, attrs) {
			  for(var key in attrs) {
			    el.setAttribute(key, attrs[key]);
			  }
			}

		$('#menu a').on('click', function(){
			var $this = $(this);

			if( $this.parent('li').is(':first-child') ){
				$('#next').removeClass('hidden');
				$('#prev').addClass('hidden');
			}else if( $this.parent('li').is(':last-child') ){
				$('#next').addClass('hidden');
				$('#prev').removeClass('hidden');
			}else{
				$('#next').removeClass('hidden');
				$('#prev').removeClass('hidden');
			}

		});

		$('#next').on('click', function(){
			var aim = $('#menu .active').parent('li').next('[data-status="enabled"]').data('path');
			// var c = true;
			// while(c){
			// 	if( leNextLi.data-status == enabled){
			// 		c = false;
			// 		var aim = $(this).find('a').data('path');;
			// 	}
			// }
			// .next('li').find('a').data('path');
			console.log("argument to be passed to loadpage: "+aim);
			loadpage.doloadpage(aim);
		});
	};

	return { dosegnav: dosegnav };
	
});