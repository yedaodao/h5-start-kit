var webpack = require('webpack');

module.exports = {
    entry: {
        entry: "./app/app.js",
        lib: ["./lib.js"]
    },
    output: {
        path: "./build",
        filename: "[name].js",
        publicPath: "/build"
    },
    externals: {
        "jquery": "Zepto"
    },
    //loaders: [
    //    {test: /zepto.*\.js/, loader: 'zepto-loader'}
    //],
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
            fileName: 'lib.js'
        })
    ],
    cache: true
};