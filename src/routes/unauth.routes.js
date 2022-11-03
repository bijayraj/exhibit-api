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
 * @openapi
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
 * @openapi
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
 * @openapi
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

/**
* @openapi
*  /forgot-password/{username}:
*    get:
*      summary: Forgot password endpoint
*      tags: [Login]
*      parameters:
*          - name: "username"
*            in: "path"
*            description: "Username"
*            required: true
*            type: "string"
*      responses:
*        "200":
*          description: successful message is successful
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Artwork'
*/
unauth.get('/forgot-password/:username', authController.forgotPassword);



/**
 * @openapi
 *  /reset-password:
 *    post:
 *      summary: Reset password
 *      tags: [Login]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - password
 *                  - repassword
 *              properties:
 *                  resetToken:
 *                      type: string
 *      responses:
 *        "200":
 *          description: Jwt and user info if successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
unauth.post('/forgot-password', authController.resetForgottenPassword);


module.exports = unauth