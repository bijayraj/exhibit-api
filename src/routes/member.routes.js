const express = require('express');
const ctrl = require('../controllers/member.controller');
const authorize = require('../helpers/authorize');
const router = express.Router();
const Role = require('../models/role');
const validator = require('express-validation');
const db = require('../database/sequelize');

//Validation from body
const memberSchema = {
    body: db.Member.validationCreate
};

router
    .route('/')
    .get(ctrl.list)
    /** POST /api/members Create new member */
    .post(authorize(Role.Admin), validator.validate(memberSchema), ctrl.create);


router.route('/:id')
    .get(ctrl.get)
    /** PUT /api/users/:userId - Update member */
    .put(authorize(Role.Admin), ctrl.update)
    /** DELETE /api/users/:userId - Delete member */
    .delete(authorize(Role.Admin), ctrl.remove);



/**
 * @swagger
 * path:
 *  /member:
 *    get:
 *      summary: Gets a list of all members limited by page and pagesize
 *      security:
 *          - BearerAuth: []
 *      tags: [Member]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            default: 0
 *          description: Page number to start from default is 0
 *        - in: query
 *          name: pageSize
 *          schema:
 *            type: integer
 *            default: 30
 *          description: Limit the number of items in each page. Default is 30
 *      responses:
 *        "200":
 *          description: Got the members
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: '#/components/schemas/Member'
 */

/**
 * @swagger
 * path:
 *  /member:
 *    post:
 *      summary: Creates Member
 *      tags: [Member]
 *      security:
 *          - BearerAuth: []           
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MemberCreate'
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Member'
 */

/**
 * @swagger
 * path:
 *  /member/{id}:
 *    get:
 *      summary: Gets a member by id
 *      security:
 *          - BearerAuth: []
 *      tags: [Member]
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of member"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Member'
 */


/**
 * @swagger
 * path:
 *  /member/{id}:
 *    put:
 *      summary: Updates the member
 *      tags: [Member]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of member"
 *            required: true
 *            type: "integer"
 *            format: "int64"          
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Member'
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Member'
 */

/**
 * @swagger
 * path:
 *  /member/{id}:
 *    delete:
 *      summary: Deletes a member by id
 *      security:
 *          - BearerAuth: []
 *      tags: [Member]
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of member"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Member'
 */


module.exports = router;