import 'babel-polyfill';
import $ from 'jquery';
import * as productSource from 'products/productSourceAMD'; // written in AMD!
import staticHtml from 'html!products/templates/static.html';

import {moduleUsingPathAlias} from 'sample-dependency-amd';

$('<div></div>').html(staticHtml).appendTo('body');

const products = productSource.getProducts();

const ul = $('<ul></ul>').appendTo('body');
for (const product of products) {
    $('<li></li>').text(product).appendTo(ul);
}

moduleUsingPathAlias.doSomething();
