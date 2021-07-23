const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const env = process.env.NODE_ENV;
module.exports = {
    mode: env == 'production' || env == 'none' ? env : 'development',
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[contenthash].bundle.js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: "file-loader",
                options: {
                    name: "[contenthash].[name].[ext]",
                    outputPath: "assets/"
                }
            },
            {
                test: /.(scss|sass|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 }
                    },
                    "postcss-loader"
                ]
            },
        ]
    },
    resolve: {
        extensions: [".js", ".css", ".scss"]
    },
    devServer: {
        port: 8081,
        watchContentBase: true,
        contentBase: path.resolve(__dirname, "src"),
        publicPath: "/",
        open: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[contenthash].main.css",
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            minify: false
        })
    ]
}
