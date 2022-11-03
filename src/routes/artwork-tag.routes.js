const express = require('express');
const artworkCtrl = require('../controllers/artwork-tag.controller');
const authorize = require('../helpers/authorize');
const router = express.Router();
const Role = require('../models/role')

router
    .route('/')
    .get(authorize([Role.Artist, Role.Admin, Role.SuperAdmin]), artworkCtrl.list)
    .post(authorize([Role.Artist, Role.Admin, Role.SuperAdmin]), artworkCtrl.create);

/**
 * @openapi
 *  /artwork-tag:
 *    get:
 *      summary: Gets a list of all artwork-tag limited by page and pagesize
 *      tags: [ArtworkTag]
 *      security:
 *         - BearerAuth: []
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
 *                  $ref: '#/components/schemas/ArtworkTag'
 */

/**
 * @openapi
 *  /artwork-tag:
 *    post:
 *      summary: Creates ArtworkTag
 *      tags: [ArtworkTag]
 *      security:
 *          - BearerAuth: []           
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - uuid
 *                  - ArtworkId
 *              properties:
 *                  uuid:
 *                      type: string
 *                  ArtworkId:
 *                      type: integer
 *                  visible:
 *                      type: boolean
 *                  UserId:
 *                      type: integer
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArtworkTag'
 */

/**
 * @openapi
 *  /artwork-tag/{id}:
 *    get:
 *      summary: Gets a artwork-tag by id
 *      tags: [ArtworkTag]
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of artwork-tag"
 *            required: true
 *            type: "string"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArtworkTag'
 */


/**
 * @openapi
 *  /artwork-tag/{id}:
 *    put:
 *      summary: Updates the artwork-tag
 *      tags: [ArtworkTag]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of artwork-tag"
 *            required: true
 *            type: "string"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - ArtworkId
 *              properties:
 *                  ArtworkId:
 *                      type: integer
 *                  description:
 *                      type: string
 *                  location:
 *                      type: string
 *                  visible:
 *                      type: boolean
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
 *  /artwork-tag/{id}:
 *    delete:
 *      summary: Deletes a artwork-tag by id
 *      security:
 *          - BearerAuth: []
 *      tags: [ArtworkTag]
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of artwork"
 *            required: true
 *            type: "string"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArtworkTag'
 */


router.route('/:id')
    .get(artworkCtrl.get)
    /** PUT */
    .put(authorize([Role.Artist, Role.Admin, Role.SuperAdmin]), artworkCtrl.update)
    /** DELETE */
    .delete(authorize([Role.Artist, Role.Admin, Role.SuperAdmin]), artworkCtrl.remove);

module.exports = router;