// define('module_pageTitle',
//      	['jquery'], 
//      	function() {

				var title = $("h1").text();
				$(document).prop('title', title);
				$("#primary_nav_wrap a").each(function(){
					if( $(this).text() == title ){
						$(this).addClass('active');
						return false;
					}
				});
				// return title;

// });