require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV,
  proxy: process.env.PROXY
};
