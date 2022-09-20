const express = require('express');
const artworkCtrl = require('../controllers/artwork.controller');
const authorize = require('../helpers/authorize');
const router = express.Router();
const Role = require('../models/role')


router
    .route('/')
    .get(authorize([Role.Artist, Role.Admin, Role.SuperAdmin]), artworkCtrl.list)
    /** POST /api/artworks Create new artwork */
    .post(authorize([Role.Artist, Role.Admin, Role.SuperAdmin]), artworkCtrl.create);

/**
 * @openapi
 *  /artwork:
 *    get:
 *      summary: Gets a list of all artworks limited by page and pagesize
 *      tags: [Artwork]
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
 *          description: Got the artworks
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: '#/components/schemas/Artwork'
 */

/**
 * @openapi
 *  /artwork:
 *    post:
 *      summary: Creates Artwork
 *      tags: [Artwork]
 *      security:
 *          - BearerAuth: []           
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - title
 *                  - description
 *                  - exhibitId
 *                  - userId
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  approved:
 *                      type: boolean
 *                  approvedDate:
 *                      type: string
 *                      format: date-time
 *                  moreInfo:
 *                      type: string
 *                  exhibitId:
 *                      type: integer
 *                  userId:
 *                      type: integer
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Artwork'
 */

/**
 * @openapi
 *  /artwork/{id}:
 *    get:
 *      summary: Gets a artwork by id
 *      tags: [Artwork]
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of artwork"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Artwork'
 */


/**
 * @openapi
 *  /artwork/{id}:
 *    put:
 *      summary: Updates the artwork
 *      tags: [Artwork]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of artwork"
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
 *                  - title
 *                  - description
 *                  - exhibitId
 *                  - userId
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  approved:
 *                      type: boolean
 *                  approvedDate:
 *                      type: string
 *                      format: date-time
 *                  moreInfo:
 *                      type: string
 *                  exhibitId:
 *                      type: integer
 *                  userId:
 *                      type: integer
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Artwork'
 */

/**
 * @openapi
 *  /artwork/{id}:
 *    delete:
 *      summary: Deletes a artwork by id
 *      security:
 *          - BearerAuth: []
 *      tags: [Artwork]
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of artwork"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Artwork'
 */


router.route('/:id')
    .get(artworkCtrl.get)
    /** PUT /api/users/:userId - Update user */
    .put(authorize([Role.Artist, Role.Admin, Role.SuperAdmin]), artworkCtrl.update)
    /** DELETE /api/users/:userId - Delete user */
    .delete(authorize([Role.Artist, Role.Admin, Role.SuperAdmin]), artworkCtrl.remove);

/**
 * @openapi
 *  /artwork/user/{id}:
 *    get:
 *      summary: Gets a artwork by by user id
 *      tags: [Artwork]
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of artwork"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Artwork'
 */
router.route('/user/:id')
    .get([Role.Artist, Role.Admin, Role.SuperAdmin], artworkCtrl.listByUser)

module.exports = router;