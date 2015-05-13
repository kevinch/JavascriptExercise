requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app',
        Q:   '../lib'
    }
});

/*
require(['app/sampleQ', 'q'], function (sample, Q) {
    // do something with the sample object
    sample.count(10, 20).then(function (countResponse) {
        console.log("count successful" + countResponse);
    });
 
    // catch an error
    sample.count(20, 10).then(function (countResponse) {
        console.log("count successful" + countResponse);
    }).catch(function (error) {
        console.log("error in sample: " + error);
    });
});
*/

requirejs(['app/menu'], function(){
	requirejs(['app/loadpage']);
});