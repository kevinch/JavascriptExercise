// define(function (require) {
define(["jquery"], function (require) {
	"use strict";

	// var Q = require('q');
	
	var domenu_actions = function(){
		$('#menu a').on('click', function(){
			var $this = $(this);

			// console.log($this);

			if( $this.data('status') === 'dropdown' ){
				$('ul').removeClass('open');
				$this.next('ul').addClass('open');
			} else {
				// console.log('nope');
			}
		});
	};

	return { domenu_actions: domenu_actions };
	
});