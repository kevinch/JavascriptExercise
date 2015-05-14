requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app:    '../app',
        Q:      '../lib',
        lodash: '../lib/lodash'
    }
});

require(['lodash'], function(_) {
  console.log('lodash version: ' + _.VERSION);
  // _.filter
});

// using Q for Promises
require(['lodash', 'app/menu', 'app/loadpage', 'q'], function (_, menu, loadpage, Q) {
	menu.domenu().then(function (){
        console.log("domenu successful");
        loadpage.doloadpage();
    }).catch(function (error) {
        console.log("error in domenu: " + error);
    });
});

// old technique with just requirejs:
// requirejs(['app/menu'], function(){
// 	requirejs(['app/loadpage']);
// });