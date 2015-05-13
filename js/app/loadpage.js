define(function (require) {
	"use strict";

	var Q = require('q');

	var doloadpage = function(){
		var deferral = Q.defer();

		document.getElementById("menu").addEventListener("click", function(e) {
			if(e.target && e.target.nodeName == "A") {

				var menu    = document.getElementById("menu"),
					as      = menu.querySelectorAll("a"),
					request = new XMLHttpRequest(),
					result  = document.getElementById("result");

				function resetActive(){
		  			Array.prototype.forEach.call(as, function(el){
						el.classList.remove("active");
					});
				}

				request.open('GET', "api/"+e.target.id+".json", true);

				request.onload = function() {
			  		if (this.status >= 200 && this.status < 400) {
			  			var data = JSON.parse(this.response);
			  			// remove active classes
			  			resetActive();
						// add active class to current element
						e.target.setAttribute("class","active");
						// fill with result
			  			result.innerHTML = data.title;

			  			deferral.resolve();
		  			} else {
					    resetActive();
					    var str = "We reached our target server, but it returned an error";
					    result.innerHTML = str;
					   	deferral.reject(str);
					}
				};

				request.onerror = function() {
					resetActive();
					var str = "There was a connection error of some sort";
				  	result.innerHTML = str;
				  	deferral.reject(str);
				};

				request.send();

			} 

		});

		return deferral.promise;

	};

	return { doloadpage: doloadpage };

});