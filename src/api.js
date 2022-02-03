/* eslint-env node */
'use strict';
const basicRoute = require('express').Router();


basicRoute.get('/', (req, res) => {
    res.status(200).json({
        key: 'Navigate to /docs for documentation'
    });
});


module.exports = basicRoute;