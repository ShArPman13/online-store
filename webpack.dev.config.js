const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8013,
    static: {
      directory: path.join(__dirname, '../dist'),
    },
  },
};
