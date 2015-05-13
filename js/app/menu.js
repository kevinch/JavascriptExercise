define(function (require) {
	"use strict";

	var Q = require('q');
	
	var domenu = function(){
		var deferral = Q.defer();

		function createElement(type, id){
			var el=document.createElement(type);
			el.setAttribute("id",id);
			document.body.appendChild(el);
		}

		// creating console element
		createElement("div","console");

		// creating h1 element
		createElement("h1","result");

		// creating nav element and appending to body
		createElement("nav","menuwrapper");
		var nav = document.getElementById("menuwrapper");
		
		// json call
		var request = new XMLHttpRequest();
		request.open('GET', 'api/menu/menu.json', true);

		request.onload = function() {
			if (this.status >= 200 && this.status < 400) {

				var ul = document.createElement("ul"),
					data = JSON.parse(this.response),
					menu = [],
					result  = document.getElementById("result");

					function build(object){
						var h = "#";
						
						if (object.status == "enabled"){
							h = object.path;
						} 
						menu.push( "<li><a data-status='"+object.status+"' data-route='"+object.route+"' href=# id="+object.path+">"+object.text+"</a>" );
						if ( object.menu ){
							menu.push( "<ul>" );
							object.menu.forEach(function(item){
								build(item);
							});
							menu.push( "</ul>" );
						}

						menu.push("</li>");
					};

				data.menu.forEach(function(item){
					build(item);
				});

				// creating inner menu and appending to nav
				ul.setAttribute("id","menu");
				ul.innerHTML = menu.join("");
				nav.appendChild(ul);

				deferral.resolve();

			} else {
				var str = "We reached our target server, but it returned an error";
				result.innerHTML = str;
				deferral.reject(str);
			}
		};

		request.onerror = function() {
			var str = "There was a connection error of some sort"
			result.innerHTML = str;
			deferral.reject(str);
		};

		request.send();

		return deferral.promise;
	};

	return { domenu: domenu };
	
});