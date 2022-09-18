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
const multer = require('multer');
const router = express.Router();
const path = require('path');

const fileStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'uploaded',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});

const fileUpload = multer({
    storage: fileStorage,
    limits: {
        fileSize: 30000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|gif|txt|wav|mp3|flv|ogg|pdf|mp4|svg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a valid file'))
        }
        cb(undefined, true)
    }
})



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

    // For Single image upload
    router.post('/upload', fileUpload.single('filename'), (req, res) => {
        res.send({ full_path: `${config.fullApiPath}/uploaded/${req.file.filename}`, file: req.file })
    }, (error, req, res, next) => {
        res.status(400).send({ error: error.message })
    });

    router.post('/uploadBulk', fileUpload.array('filenames', 4), (req, res) => {
        res.send(req.files)
    }, (error, req, res, next) => {
        res.status(400).send({ error: error.message })
    });

    app.use('/api/v1', router);
    app.use('/api/v1/uploaded', express.static('uploaded'))


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