module.exports = {
    entry: "./dist/.tmp/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "app.js",
        libraryTarget: 'var',
        library: 'Router'
    }, 
    externals: {
      "Router": "Router"
    }
};