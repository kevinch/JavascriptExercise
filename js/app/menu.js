define(["jquery"], function ($) {

	$.getJSON( "api/data.json", function( data ) {
	  var menu = [];
	  
	  function build(object){
		  	var h = "#";
		    if (object.status == "enabled"){
		    	h = object.path;
		    } 
		    menu.push( "<li><a href="+h+">"+object.text+"</a></li>" );
		  if ( object.menu ){
		  	menu.push( "<ul>" );
		  	$.each( object.menu, function() {
		  		build(this);
		  	});
		  	menu.push( "</ul>" );
		  }
	  };

	  $.each( data.menu, function() {
	    build(this);
	  });
	 
	  $( "<ul/>", {
	    "class": "my-new-list",
	    html: menu.join( "" )
	  }).appendTo( "body" );

	});

});