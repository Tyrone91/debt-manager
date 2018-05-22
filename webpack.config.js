const path = require("path");

module.exports = {
    entry: "./js/app.js",
    output: {
        filename: "debt-manager.js",
        path: path.resolve(__dirname, "standalone")
    },
    mode: "development"
};