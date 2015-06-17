// define(function (require) {
define(["jquery"], function (require) {
	"use strict";
	
	var domenu_animations = function(){
		$('#menu a').on('click', function(){
			var $this = $(this);

			if( $this.hasClass('active') ){
				// $this.removeClass('active');
			} else if( $this.data('status') != 'disabled' ){
				$('#menu a').removeClass('active');
				$this.addClass('active');
			}
			
			if( $this.next('ul').hasClass('open') ){
				// $this.next('ul').removeClass('open');
				$this.removeClass('active');
			} else {
				// $('ul').removeClass('open');
				$this.next('ul').addClass('open');
			}
			
		});
	};

	return { domenu_animations: domenu_animations };
	
});