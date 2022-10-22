const express = require('express');
// const validate = require('express-validation');
// const paramValidation from '../../config/param-validation';
const userCtrl = require('../controllers/user.controller');
const authorize = require('../helpers/authorize');
const router = express.Router(); // eslint-disable-line new-cap
const Role = require('../models/role')


router
    .route('/')
    /** GET /api/users - Get list of users */
    .get(authorize(Role.SuperAdmin), userCtrl.list)
    /** POST /api/users - Create new user */
    .post(userCtrl.registerNew);


/**
 * @openapi
 *  /user:
 *    get:
 *      summary: Gets a list of all users
 *      security:
 *          - BearerAuth: []
 *      tags: [User]
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: '#/components/schemas/User'
 */


/**
 * @openapi
 *  /user:
 *    post:
 *      summary: Creates user
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - username
 *                  - password
 *                  - role
 *              properties:
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 *                  role:
 *                      type: string
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */


/**
 * @openapi
 *  /user/{userId}:
 *    get:
 *      summary: Gets a user by id
 *      security:
 *          - BearerAuth: []
 *      tags: [User]
 *      parameters:
 *          - name: "userId"
 *            in: "path"
 *            description: "Id of user to return"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.route('/:userId')
    .get(authorize(Role.SuperAdmin), userCtrl.get)
    /** PUT /api/users/:userId - Update user */
    .put(authorize(Role.SuperAdmin), userCtrl.updateById)
    /** DELETE /api/users/:userId - Delete user */
    .delete(authorize(Role.SuperAdmin), userCtrl.remove);


/**
 * @openapi
 *  /user/getone/{id}:
 *    get:
 *      summary: Gets a user by id
 *      security:
 *          - BearerAuth: []
 *      tags: [User]
 *      parameters:
 *          - name: "userId"
 *            in: "path"
 *            description: "Id of user to return"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.route('/getone/:id')
    .get(authorize(Role.SuperAdmin), userCtrl.getById);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);
module.exports = router;