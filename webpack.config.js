const path = require("path");

module.exports = {
  mode: "development",
  entry: "./lineChart.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  }
};
