define(["jquery"], function () {

	var $nav = $("<nav>", {id: "menuwrapper", class: "a"});
	$("body").append($nav);

	$.getJSON( "api/data.json", function( data ) {
	  var menu = [];
	  
	  function build(object){
	  	var h = "#";
	    if (object.status == "enabled"){
	    	h = object.path;
	    } 
	    menu.push( "<li><a href=# id="+object.path+">"+object.text+"</a>" );
		  if ( object.menu ){
		  	menu.push( "<ul>" );
		  	$.each( object.menu, function() {
		  		build(this);
		  	});
		  	menu.push( "</ul>" );
		  }
		  menu.push("</li>");
	  };

	  $.each( data.menu, function() {
	    build(this);
	  });

	  $( "<ul/>", {
	    "id": "menu",
	    html: menu.join( "" )
	  }).appendTo( "#menuwrapper" );

	});

});