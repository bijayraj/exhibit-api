const os = require('os');
const cnfg = require('dotenv').config();

let config = require('./config.json')[process.env.NODE_ENV || 'development'];
config.baseUrl = os.hostname() + 'api/v1';

config.jwtSecret = process.env.APP_SECRET;
config.Dat

module.exports = config;