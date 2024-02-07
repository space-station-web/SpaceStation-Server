// const nodeExternals = require("webpack-node-externals");
// const path = require("path");
import path from 'path';
import nodeExternals from "webpack-node-externals";

/*
module.exports = {
    // CommonJS 스크립트
  };
*/
// webpack 설정 파일을 ES 모듈로 유지하려면, require 대신 import, export를 사용해야 함
export default {
    mode: "development",
    context: __dirname + '/src',
    entry: {
        app: '../index.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
            },
            },
            exclude: /node_modules/,
        },
        ],
    },
    target: "node",
    externalsPresets: {
        node: true,
    },
    externals: [nodeExternals()],
    };