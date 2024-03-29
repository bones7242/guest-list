const path = require("path");
const webpack = require("webpack");

module.exports = {
    // the entry file for the bundle
    entry: path.join(__dirname, "/client/src/app.jsx"),

    // the bundle file we will get in the result
    output: {
        path: path.join(__dirname, "/client/dist/js"),
        filename: "app.js",
    },
    module: {
        // apply loaders to files that meet given conditions
        loaders: [
                {
                test: /\.jsx?$/,
                include: path.join(__dirname, "/client/src"),
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015"]
                }
            }
        ]
    },
    devtool: "eval-source-map"
};