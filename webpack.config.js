module.exports = {
    entry: ['./app/main.js'],
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'ify-loader'
            }
        ]
    },
};