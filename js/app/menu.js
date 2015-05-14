define(function (require) {
	"use strict";

	var Q = require('q');
	
	var domenu = function(){
		// creating console element
		createElement("div","console");
		// creating h1 element
		createElement("h1","result");
		// creating nav element and appending to body
		createElement("nav","menuwrapper");
		
		var nav = document.getElementById("menuwrapper"),
			deferral = Q.defer(),
			request = new XMLHttpRequest();

		function createElement(type, id){
			var el=document.createElement(type);
			el.setAttribute("id",id);
			document.body.appendChild(el);
		}

		// json call
		request.open('GET', 'api/menu/menu.json', true);

		request.onload = function() {
			if (this.status >= 200 && this.status < 400) {

				var ul        = document.createElement("ul"),
					jsonParse = JSON.parse(this.response),
					menu      = [],
					result    = document.getElementById("result");

				// High-order function
				function isEnabled(item){
					if ( _.get(item, 'status') == 'enabled' ){
						console.log(item.text+': good for menu');
						return buildMenu(item);
					} else {
						console.log(item.text+': no good for menu');
						return false;
					}
				};

				// building the menu structure
				function buildMenu(object){
					var status = _.get(object, 'status'),
						route  = _.get(object, 'route'),
						path   = _.get(object, 'path'),
						text   = _.get(object, 'text');

					menu.push( "<li><a data-status='"+status+"' data-route='"+route+"' href=# id="+path+">"+text+"</a>" );
					// Not in use currently as we just use status.enabled and not .dropdown 
					// if ( object.menu ){
					// 	menu.push( "<ul>" );
					// 	object.menu.forEach(function(item){
					// 		buildMenu(item);
					// 	});
					// 	menu.push( "</ul>" );
					// }
					menu.push("</li>");
				};

				// starting to buidl the menu
				jsonParse.menu.forEach(function(item){
					isEnabled( item );
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