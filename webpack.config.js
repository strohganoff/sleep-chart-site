var path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

process.env.NODE_ENV = 'development';


module.exports = {
    mode: "development",
    // entry: './src/index.jsx',
    entry: './src/',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // resolve: {
    //     alias: {
    //         "react": "preact-compat",
    //         "react-dom": "preact-compat"
    //     }
    // },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //             title: "App",
    //             meta: {},
    //             inject: 'head',
    //             template: path.resolve('dist/index.html')
    //     }),
    //     new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/bundle\.js/])
    // ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    devServer: {
        static: {
            // directory: path.join(__dirname, "dist")
            directory: './dist',
            publicPath: '/'
        },
        host: '0.0.0.0',
        port: 4000,
        allowedHosts: 'all',
        hot: true,
    }
};