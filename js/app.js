requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        Q:   '../lib'
    }
});

// using Q for Promises
require(['app/menu', 'app/loadpage', 'q'], function (menu, loadpage, Q) {
	menu.domenu().then(function () {
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