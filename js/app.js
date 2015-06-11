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
    'app/menu_animations', 
    'app/seg_nav',
    'q'
  ], function (_, menu, loadpage, menu_actions, seg_nav, Q) {

	// test with lodash version
	console.log('lodash version: ' + _.VERSION);

	// promise
	menu.domenu().then(function (){
    // a test
    console.log("domenu successful");
    
    menu_actions.domenu_animations();
    seg_nav.dosegnav();
    loadpage.doloadpage();

  }).catch(function (error) {
      console.log("Some error: " + error);
  });
});