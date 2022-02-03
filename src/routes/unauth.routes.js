const express = require('express');
const validator = require('express-validation');
const Joi = require('joi');
const unauth = express.Router();
const authController = require('../controllers/auth.controller');
const authorize = require('../helpers/authorize');



// POST /api/auth/login
const loginSchema = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
};


/**
 * @swagger
 * path:
 *  /login:
 *    post:
 *      summary: Authenticates and logs in
 *      tags: [Login]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - username
 *                  - password
 *              properties:
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *        "200":
 *          description: Jwt and user info if successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
unauth.post('/login', validator.validate(loginSchema), authController.login)


/**
 * @swagger
 * path:
 *  /refresh-token:
 *    post:
 *      summary: Sends a new jwt on receiving a request token
 *      tags: [Login]
 *      parameters:
 *        - in: query
 *          name: refreshToken
 *          schema:
 *            type: string
 *            default: ''
 *          description: Refresh Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  refreshToken:
 *                      type: string
 *      responses:
 *        "200":
 *          description: Jwt and user info if successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */

unauth.post('/refresh-token', authController.refreshToken);


/**
 * @swagger
 * path:
 *  /revoke-token:
 *    post:
 *      summary: Revokes a token
 *      tags: [Login]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *        - in: query
 *          name: refreshToken
 *          schema:
 *            type: string
 *            default: ''
 *          description: Refresh Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  refreshToken:
 *                      type: string
 *      responses:
 *        "200":
 *          description: Jwt and user info if successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */

unauth.post('/revoke-token', authorize(), authController.revokeToken);

module.exports = unauth