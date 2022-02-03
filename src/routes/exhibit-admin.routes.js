const express = require('express');
const exhibitAdminCtrl = require('../controllers/exhibit-admin.controller');
const authorize = require('../helpers/authorize');
const router = express.Router();
const Role = require('../models/role')


router
    .route('/')
    .get(exhibitAdminCtrl.list)
    /** POST /api/exhibits Create new exhibit */
    .post(authorize([Role.Admin, Role.SuperAdmin]), exhibitAdminCtrl.create);

/**
 * @swagger
 * path:
 *  /exhibit-admin:
 *    get:
 *      summary: Gets a list of all exhibits limited by page and pagesize
 *      security:
 *          - BearerAuth: []
 *      tags: [UserExercise]
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
 *                  $ref: '#/components/schemas/Exercise'
 */

/**
 * @swagger
 * path:
 *  /exhibit-admin:
 *    post:
 *      summary: Creates Exercise
 *      tags: [UserExercise]
 *      security:
 *          - BearerAuth: []           
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Exercise'
 */

/**
 * @swagger
 * path:
 *  /exhibit-admin/{id}:
 *    get:
 *      summary: Gets a exhibit by id
 *      security:
 *          - BearerAuth: []
 *      tags: [UserExercise]
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
 *                $ref: '#/components/schemas/Exercise'
 */


/**
 * @swagger
 * path:
 *  /exhibit-admin/{id}:
 *    put:
 *      summary: Updates the exhibit
 *      tags: [UserExercise]
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
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Exercise'
 */

/**
 * @swagger
 * path:
 *  /exhibit-admin/{id}:
 *    delete:
 *      summary: Deletes a exhibit by id
 *      security:
 *          - BearerAuth: []
 *      tags: [UserExercise]
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
 *                $ref: '#/components/schemas/Exercise'
 */


router.route('/:id')
    .get(exhibitAdminCtrl.get)
    /** PUT /api/users/:userId - Update user */
    .put(authorize(Role.Admin), exhibitAdminCtrl.update)
    /** DELETE /api/users/:userId - Delete user */
    .delete(authorize(Role.Admin), exhibitAdminCtrl.remove);


router.route('/user/:id')
    .get(exhibitAdminCtrl.getByUser)

router.route('/exhibit/:id')
    .get(exhibitAdminCtrl.getByExhibit)

router.route('/add-exhibit')
    .post(exhibitAdminCtrl.addExhibitAdmin)



/**
 * @swagger
 * path:
 *  /exhibit-admin/user/{id}:
 *    get:
 *      summary: Gets a list of all exhibits as per user
 *      security:
 *          - BearerAuth: []
 *      tags: [UserExercise]
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "Id of user"
 *          required: true
 *          type: "integer"
 *          format: "int64"
 *      responses:
 *        "200":
 *          description: Got the user exerises
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: '#/components/schemas/Exercise'
 */



/**
 * @swagger
 * path:
 *  /exhibit-admin/add-exhibit:
 *    post:
 *      summary: Creates Exercise inside user
 *      tags: [UserExercise]
 *      security:
 *          - BearerAuth: [] 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - user_id
 *                  - exhibit+id
 *              properties:
 *                  user_id:
 *                      type: integer
 *                  exhibit_id:
 *                      type: integer
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Exercise'
 */

module.exports = router;