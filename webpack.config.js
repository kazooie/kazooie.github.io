var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:8090/assets',
        sourceMapFileName: 'bundle.map'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src/'),
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};