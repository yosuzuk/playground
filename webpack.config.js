const webpack = require('webpack');
const path = require('path');

const isDebug = global.DEBUG === false ? false : !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');

const config = {
    debug: isDebug, // switch loaders to debug or release mode
    entry: {
        products: './assets/js/modules/views/products/indexES6.js',
        productCategories: './assets/js/modules/views/productCategories/indexAMD.js'
    },
    output: {
        path: __dirname + '/webroot/dist',
        filename: 'js/modules/views/[name]/index.js?[hash]',
        publicPath: 'dist'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
        }]
    },
    resolveLoader: {
        alias: {
            text: 'raw'
        }
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'], // adds bower support
        root: path.resolve(__dirname),
        alias: {
            products: 'assets/js/modules/views/products',
            productCategories: 'assets/js/modules/views/productCategories'
        }
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
        )
        //new webpack.NormalModuleReplacementPlugin(/^(domReady\!)$/, 'TODO define')
    ],
    node: {
        fs: 'empty', // mocks for when node.js specific modules may be required
        net: 'empty',
        tls: 'empty'
    }
};

// Optimize the bundle in release (production) mode
if (!isDebug) {
    config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: isVerbose
        }
    }));
    config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

module.exports = config;
