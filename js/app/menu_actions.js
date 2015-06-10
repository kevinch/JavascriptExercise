// define(function (require) {
define(["jquery"], function (require) {
	"use strict";

	// var Q = require('q');
	
	var domenu_actions = function(){
		$('#menu a').on('click', function(){
			var $this = $(this);

			if( $this.hasClass('active') ){
				$this.removeClass('active');
			}else if( $this.data('status') != 'disabled' ){
				$this.addClass('active');
			}
			
			if( $this.next('ul').hasClass('open') ){
				$this.next('ul').removeClass('open');
				$this.removeClass('active');
			}else {
				$this.next('ul').addClass('open');
			}
			
			

		});
	};

	return { domenu_actions: domenu_actions };
	
});