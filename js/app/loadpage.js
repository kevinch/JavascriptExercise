define(function (require, arg) {
	"use strict";

	var Q = require('q');

	var doloadpage = function(){
		var deferral = Q.defer();

		// if(arg){
		// 	console.dir('argument from #next: '+arg);
		// }

		var menu    = document.getElementById("menu"),
			as      = menu.querySelectorAll("a"),
			request = new XMLHttpRequest(),
			result  = document.getElementById("result"),
			path;

		document.getElementById("menu").addEventListener("click", function(e) {

			if ( e.target.getAttribute('data-status') == 'enabled' ){				
				
				path = e.target.dataset.path;

				request.open('GET', "api/"+path+"/data.json", true);

				request.onload = function() {
				  	if (this.status >= 200 && this.status < 400) {
			  			var data = JSON.parse(this.response);
						// fill with result
			  			result.innerHTML = data.index.title;

			  			deferral.resolve();
			  		} else {
					    var str = "We reached our target server, but it returned an error";
					    result.innerHTML = str;
					   	deferral.reject(str);
					}
				};
				request.onerror = function() {
					var str = "There was a connection error of some sort";
				  	result.innerHTML = str;
				  	deferral.reject(str);
				};
				request.send();

			} else {
				console.log("\""+e.target.dataset.route+"\" link is disabled.");
			} 

		});

		return deferral.promise;

	};

	return { doloadpage: doloadpage };

});