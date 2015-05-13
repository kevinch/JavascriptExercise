// promise with Q
	// define(["jquery"], function (require) {

	// 	var Q = require('q');



	// });


// old
define( function () {

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
			menu = [];
	  
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

	  } else {
	    console.log("We reached our target server, but it returned an error");
	  }
	};

	request.onerror = function() {
	  console.log("There was a connection error of some sort");
	};

	request.send();

});