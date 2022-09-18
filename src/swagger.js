const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require('express');
const httpStatus = require("http-status");
const router = express.Router()
const glob = require('glob');
const path = require('path');

const routesDir = path.normalize(`${__dirname}/routes`);
const apiFiles = glob.sync(routesDir + '/*.js');

console.log(apiFiles)

const config = require('./config/index');

const applicationName = config.swaggerApplicationName;

// Swagger set up
const options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        // swagger:'2.0',
        info: {
            title: applicationName,
            version: "1.0.0",
            description: "An API project Artwork Project",
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/"
            },
            contact: {
                name: "Bijay Raj Paudel",
                url: "bijayraj.paudel",
                email: "bijayraj.paudel@siu.edu"
            }
        },
        servers: [{
            url: '/api/v1/'

        }]
    },

    apis: [
        "./src/components.yaml",
        "./src/auto-sequelize-models.yaml",
        "./src/auto-joi-swagger.yaml",
        './src/routes/artwork-asset.routes.js',
        './src/example.js',
        ...apiFiles
    ]
};



const specs = swaggerJsdoc(options);

router.get("/api-docs.json", (req, res) => {
    res.send(specs);
});

router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(specs, {
    explorer: true
}));


module.exports = router