module.exports = {
    entry: __dirname + `/src/index.ts`,
    output: {
        filename: `index.js`,
        path: __dirname + '/dist',
        libraryTarget: "amd"
    },
    externals: [(context, req, cb) => {
        ['rink-app'].indexOf(req) > -1 ? cb(null, 'amd ' + req) : cb()
    }],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    node: {
        process: false,
        fs: 'empty',
        path: 'empty'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                transpileOnly: true,
                happyPackMode: true,
            }
        }]
    }
}