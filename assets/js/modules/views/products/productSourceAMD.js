define(function(require) {
    'use strict';

    var getProducts = function() {
        return ['MyProduct1', 'MyProduct2', 'MyProductN'];
    };

    return {
        getProducts: getProducts
    };
});
