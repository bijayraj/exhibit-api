/* eslint-env node */
'use strict';
const express = require('express');
const http = require('http');
const debug = require('debug')('alumni-directory-api:server');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const api = require('./src/api');
const swagger = require('./src/swagger');
const APIError = require('./src/helpers/APIError');
const helmet = require('helmet');
const cors = require('cors');
const expressValidation = require('express-validation');
const Sequelize = require('sequelize');
const httpStatus = require('http-status-codes');

require('dotenv').config();

const config = require('./src/config');

const startServer = function (port) {
    const app = express();
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({
        extended: false
    }));
    app.use(cookieParser());

    app.use(helmet());
    app.use(cors());

    app.set('port', port);
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(`server now listening on port ${port}.`);
    });
    server.on('error', err => {
        console.log(err);
    });
    debug(port);

    server.on('listening', () => {
        const addr = server.address();
        const bind = typeof addr === 'string' ?
            'pipe ' + addr :
            'port ' + addr.port;
        debug('Listening on ' + bind);
    });
    app.use('/', api);
    //Configure and use swagger
    app.use('/', swagger);
    require('./src/routes')(app);

    // if error is not an instanceOf APIError, convert it.
    app.use((err, req, res, next) => {

        if (err instanceof expressValidation.ValidationError) {
            const unifiedErrorMessage = err.details.body
                .map(error => error.message)
                .join(' and ');
            const error = new APIError(unifiedErrorMessage, err.statusCode, true);
            return next(error);
        } else if (err instanceof Sequelize.ValidationError) {
            const unifiedErrorMessage = err.errors
                .map(error => error.message)
                .join(' and ');
            const error = new APIError(unifiedErrorMessage, err.statusCode, true);
            return next(error);
        } else if (!(err instanceof APIError)) {
            const apiError = new APIError(err.message, err.status || err.statusCode, err.isPublic);
            return next(apiError);
        }
        return next(err);
    });

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new APIError('API not found', httpStatus.StatusCodes.NOT_FOUND);
        return next(err);
    });


    app.use((
        err,
        req,
        res,
        next, // eslint-disable-line no-unused-vars
    ) =>
        res.status(err.status || 500).json({
            message: err.isPublic ? err.message : httpStatus[err.status],
            stack: process.env.NODE_ENV === 'development' ? err.stack : {},
        }));



    return app;
};


if (require.main === module) {
    startServer(process.env.PORT || 3001);
}

module.exports = startServer;