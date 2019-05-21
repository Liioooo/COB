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
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
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
            },
          {
            test: /\.(svg|png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {}
              }
            ]
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "docs/help.html",
            filename: "./help.html",
        }),
        new HtmlWebpackPlugin({
            template: "docs/about.html",
            filename: "./about.html",
        })
    ]
};
