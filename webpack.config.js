const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    target: "web",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },

    entry: path.resolve(__dirname, "sandbox", "index"),

    resolve: {
        extensions: [ ".tsx", ".jsx", ".js", ".ts" ],
        alias: {
            "misc": path.resolve(process.cwd(), "package", "misc"),
            "utils": path.resolve(process.cwd(), "package", "utils"),
            "types": path.resolve(process.cwd(), "package", "types"),
            "connector-utils": path.resolve(process.cwd(), "package", "connector-utils")
        }
    },

    devServer: {
        host: "0.0.0.0",
        port: 8080,
        hot: true
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.tsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: "tsconfig.json"
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [ MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader" ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "sandbox", "index.html")
        }),

        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            process: "process/browser"
        })
    ]
};
