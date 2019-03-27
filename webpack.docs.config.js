const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './docs/docs-main.js',
    output: {
      filename: 'docs-main.js',
      path: path.resolve(__dirname, 'src/assets/docs')
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                    {
                        loader: "markdown-loader",
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "docs/html-templates/help-template.html",
            filename: "./help.html",
        }),
        new HtmlWebpackPlugin({
            template: "docs/html-templates/about-template.html",
            filename: "./about.html",
        })
    ]
};