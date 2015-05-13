define(function (require) {
	"use strict";

	var Q = require('q');
	
	var domenu = function(){
		var deferral = Q.defer();

		// creating nav element and appending to body
		var nav = document.createElement("nav");
		nav.setAttribute("id","menuwrapper");
		document.body.appendChild(nav);

		// json call
		var request = new XMLHttpRequest();
		request.open('GET', 'api/data.json', true);

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
						menu.push( "<li><a href=# id="+object.path+">"+object.text+"</a>" );
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