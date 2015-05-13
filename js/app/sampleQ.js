define(function (require) {
    "use strict";
 
    // using simplified CommonJS syntax so it is clear what vars I can use in this
    // function and not to confuse the order of them
    var Q = require('q');
    // Add other libraries such a: var amplify = require('amplify');
 
    // a private method that delays 
    var count = function (beginningNumber, endingNumber) {
        var deferral = Q.defer();
        var newNumber = 0;
        
        if (endingNumber < beginningNumber) {
            deferral.reject("endingNumber before beginningNumber");
        }
        
        // do something that takes some time
        for (var i = beginningNumber; i < endingNumber; i++) {
            Q.delay(10);
            newNumber += i;
        }
        
        console.log("in sampleQ: " + newNumber + typeof(newNumber));

        deferral.resolve(newNumber);
 
        return deferral.promise;
    };    

    return { count: count };
});