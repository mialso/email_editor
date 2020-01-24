const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
            },
        ],
    },
    resolve: {
        extensions: [ '*', '.js' ],
    },
    output: {
        path: `${__dirname}/dist`,
        filename: 'emailEditor.js',
        library: 'EmailEditor',
        libraryTarget: 'umd',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'emailEditor.css',
        }),
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 4004,
    },
};
