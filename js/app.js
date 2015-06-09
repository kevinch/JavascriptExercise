requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app:    '../app',
        Q:      '../lib',
        lodash: '../lib/lodash',
        jquery: '../lib/jquery'
    }
});

require(
        [
	        'lodash', 
	        'app/menu', 
	        'app/loadpage', 
	        'app/menu_actions', 
	        'q'
        ], function (_, menu, loadpage, menu_actions, Q) {

	console.log('lodash version: ' + _.VERSION);
	menu.domenu().then(function (){
        console.log("domenu successful");
        
        menu_actions.domenu_actions();
        // loadpage.doloadpage();
    }).catch(function (error) {
        console.log("error in domenu: " + error);
    });
});