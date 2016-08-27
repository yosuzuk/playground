define(function(require) {
    'use strict';

    var $ = require('jquery');
    var productCategorySource = require('productCategories/productCategorySourceES6');
    //var staticHtml = require('text!productCategories/templates/static.html'); // syntax not supported
    var staticHtml = require('productCategories/templates/static.html!text');
    //require('domReady!');

    $('<div></div>').html(staticHtml).appendTo('body');

    var productCategories = productCategorySource.getProductCategories();

    var ul = $('<ul></ul>').appendTo('body');
    productCategories.forEach(function(productCategory) {
        $('<li></li>').text(productCategory).appendTo(ul);
    });

    return {};
});
