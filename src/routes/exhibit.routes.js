const express = require('express');
const exhibitCtrl = require('../controllers/exhibit.controller');
const authorize = require('../helpers/authorize');
const router = express.Router();
const Role = require('../models/role')


router
    .route('/')
    .get(exhibitCtrl.list)
    /** POST /api/exhibits Create new exhibit */
    .post(authorize([Role.User, Role.Admin, Role.SuperAdmin]), exhibitCtrl.create);

/**
 * @swagger
 * path:
 *  /exhibit:
 *    get:
 *      summary: Gets a list of all exhibits limited by page and pagesize
 *      tags: [Exhibit]
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
 *          description: Got the exhibits
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: '#/components/schemas/Exhibit'
 */

/**
 * @openapi
 *  /exhibit:
 *    post:
 *      summary: Creates Exhibit
 *      tags: [Exhibit]
 *      security:
 *          - BearerAuth: []           
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - name
 *                  - description
 *                  - location
 *                  - address
 *                  - startDate
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  location:
 *                      type: string
 *                  address:
 *                      type: string
 *                  moreInfo:
 *                      type: string
 *                  visible:
 *                      type: boolean
 *                  startDate:
 *                      type: string
 *                      format: date-time
 *                  endDate:
 *                      type: string
 *                      format: date-time
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Exhibit'
 */

/**
 * @openapi
 *  /exhibit/{id}:
 *    get:
 *      summary: Gets a exhibit by id
 *      tags: [Exhibit]
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of exhibit"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Exhibit'
 */


/**
 * @openapi
 *  /exhibit/{id}:
 *    put:
 *      summary: Updates the exhibit
 *      tags: [Exhibit]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of exhibit"
 *            required: true
 *            type: "integer"
 *            format: "int64"          
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - name
 *                  - description
 *                  - location
 *                  - address
 *                  - startDate
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  location:
 *                      type: string
 *                  address:
 *                      type: string
 *                  moreInfo:
 *                      type: string
 *                  visible:
 *                      type: boolean
 *                  startDate:
 *                      type: string
 *                      format: date-time
 *                  endDate:
 *                      type: string
 *                      format: date-time
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Exhibit'
 */

/**
 * @openapi
 *  /exhibit/{id}:
 *    delete:
 *      summary: Deletes a exhibit by id
 *      security:
 *          - BearerAuth: []
 *      tags: [Exhibit]
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of exhibit"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Exhibit'
 */


router.route('/:id')
    .get(exhibitCtrl.get)
    /** PUT /api/users/:userId - Update user */
    .put(authorize(Role.Admin), exhibitCtrl.update)
    /** DELETE /api/users/:userId - Delete user */
    .delete(authorize(Role.Admin), exhibitCtrl.remove);





module.exports = router;