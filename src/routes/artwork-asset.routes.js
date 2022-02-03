const express = require('express');
const artworkAssetCtrl = require('../controllers/artwork-asset.controller');
const authorize = require('../helpers/authorize');
const router = express.Router();
const Role = require('../models/role')


router
    .route('/')
    .get(artworkAssetCtrl.list)
    /** POST /api/artworkAssets Create new artworkAsset */
    .post(authorize([Role.Artist, Role.Admin, Role.SuperAdmin]), artworkAssetCtrl.create);

/**
 * @swagger
 * path:
 *  /artwork-asset:
 *    get:
 *      summary: Gets a list of all artworkAssets limited by page and pagesize
 *      security:
 *          - BearerAuth: []
 *      tags: [ArtworkAsset]
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
 *          description: Got the artworkAssets
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: '#/components/schemas/ArtworkAsset'
 */

/**
 * @swagger
 * path:
 *  /artwork-asset:
 *    post:
 *      summary: Creates ArtworkAsset
 *      tags: [ArtworkAsset]
 *      security:
 *          - BearerAuth: []           
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - address
 *                  - description
 *                  - assetType
 *                  - ArtworkId
 *              properties:
 *                  description:
 *                      type: string
 *                  address:
 *                      type: string
 *                  approved:
 *                      type: boolean
 *                  approvedDate:
 *                      type: string
 *                      format: date-time
 *                  visible:
 *                      type: boolean
 *                  ArtworkId:
 *                      type: integer
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArtworkAsset'
 */

/**
 * @swagger
 * path:
 *  /artwork-asset/{id}:
 *    get:
 *      summary: Gets a artworkAsset by id
 *      security:
 *          - BearerAuth: []
 *      tags: [ArtworkAsset]
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of artworkAsset"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArtworkAsset'
 */


/**
 * @swagger
 * path:
 *  /artwork-asset/{id}:
 *    put:
 *      summary: Updates the artworkAsset
 *      tags: [ArtworkAsset]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of artworkAsset"
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
 *                  - address
 *                  - description
 *                  - assetType
 *                  - ArtworkId
 *              properties:
 *                  description:
 *                      type: string
 *                  address:
 *                      type: string
 *                  approved:
 *                      type: boolean
 *                  approvedDate:
 *                      type: string
 *                      format: date-time
 *                  visible:
 *                      type: boolean
 *                  ArtworkId:
 *                      type: integer
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArtworkAsset'
 */

/**
 * @swagger
 * path:
 *  /artwork-asset/{id}:
 *    delete:
 *      summary: Deletes a artworkAsset by id
 *      security:
 *          - BearerAuth: []
 *      tags: [ArtworkAsset]
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of artworkAsset"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArtworkAsset'
 */


router.route('/:id')
    .get(artworkAssetCtrl.get)
    /** PUT /api/users/:userId - Update user */
    .put(authorize([Role.Artist, Role.Admin, Role.SuperAdmin]), artworkAssetCtrl.update)
    /** DELETE /api/users/:userId - Delete user */
    .delete(authorize([Role.Admin, Role.SuperAdmin]), artworkAssetCtrl.remove);





module.exports = router;