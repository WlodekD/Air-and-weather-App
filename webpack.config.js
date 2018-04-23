const path = require("path");

module.exports = {
    mode: 'development',
    entry: "./js/app.js",
    output: {  path: path.join(__dirname, "./js/"), filename : 'out.js' },
    watch: true,
    devtool: "cheap-module-eval-source-map",
    module: {
        rules : [
            {
            test: /\.jsx$/,  exclude: /node_modules/,
            loader: 'babel-loader',
            query: { presets: ['es2015', 'stage-2', 'react'] }
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }
        ]
    }
};
