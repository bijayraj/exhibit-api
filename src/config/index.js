const os = require('os');
const cnfg = require('dotenv').config();
console.log('NODE ENV =')
console.log(process.env.NODE_ENV)
let config = require('./config.json')[process.env.NODE_ENV || 'development'];
config.baseUrl = os.hostname() + 'api/v1';

// config.jwtSecret = process.env.APP_SECRET;


module.exports = config;