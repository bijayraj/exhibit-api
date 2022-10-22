const express = require('express');
const artworkApprovalCtrl = require('../controllers/artwork-approval.controller');
const authorize = require('../helpers/authorize');
const router = express.Router();
const Role = require('../models/role')


router
    .route('/')
    .get(artworkApprovalCtrl.list)
    .post(authorize([Role.Artist, Role.Admin, Role.SuperAdmin]), artworkApprovalCtrl.requestApproval);

/**
 * @openapi
 *  /artwork-approval:
 *    get:
 *      summary: Gets a list of all artworkAssets limited by page and pagesize
 *      tags: [ArtworkApproval]
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
 *          description: Got the ArtworkApproval
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: '#/components/schemas/ArtworkApproval'
 */

/**
 * @openapi
 *  /artwork-approval:
 *    post:
 *      summary: Creates ArtworkApproval
 *      tags: [ArtworkApproval]
 *      security:
 *          - BearerAuth: []       
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - UserId
 *                  - ArtworkId
 *              properties:
 *                  UserId:
 *                      type: integer
 *                  ArtworkId:
 *                      type: integer
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArtworkApproval'
 */

/**
 * @openapi
 * /artwork-approval/{id}:
 *    get:
 *      summary: Gets a artworkAsset by id
 *      tags: [ArtworkApproval]
 *      security:
 *          - BearerAuth: []
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
 *                $ref: '#/components/schemas/ArtworkApproval'
 */


/**
 * @openapi
 * /artwork-approval/{id}:
 *    put:
 *      summary: Updates the ArtworkApproval
 *      tags: [ArtworkApproval]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of ArtworkApproval"
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
 *                $ref: '#/components/schemas/ArtworkApproval'
 */

/**
 * @openapi
 * /artwork-approval/{id}:
 *    delete:
 *      summary: Deletes a artworkAsset by id
 *      security:
 *          - BearerAuth: []
 *      tags: [ArtworkApproval]
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of ArtworkApproval"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArtworkApproval'
 */


router.route('/:id')
    .get(artworkApprovalCtrl.get)
    .put(authorize([Role.Admin, Role.SuperAdmin]), artworkApprovalCtrl.update)
    .delete(authorize([Role.Admin, Role.SuperAdmin]), artworkApprovalCtrl.remove);




/**
 * @openapi
 *  /artwork-approval/artwork/{id}:
 *    get:
 *      summary: Gets a artworkAsset by artwork id
 *      tags: [ArtworkApproval]
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
 *                $ref: '#/components/schemas/ArtworkAsset'
 */


router.route('/artwork/:id')
    .get(authorize([Role.Artist, Role.Admin, Role.SuperAdmin]), artworkApprovalCtrl.getByArtworkId)


/**
 * @openapi
 *  /artwork-approval/{id}/{reject}:
 *    post:
 *      summary: Approve Artwork
 *      tags: [ArtworkApproval]
 *      security:
 *          - BearerAuth: []       
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "Id of artwork approval"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *          - name: "reject"
 *            in: "path"
 *            description: "Reject"
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
 *                  comment:
 *                      type: string
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArtworkApproval'
 */


router.route('/approve/:id/:reject')
    .post(authorize([Role.Admin, Role.SuperAdmin]), artworkApprovalCtrl.approveReject)




/**
 * @openapi
 *  /artwork-approval/byresolution/{resolved}}:
 *    get:
 *      summary: Gets a artworkapprovals that are unresolved 
 *      tags: [ArtworkApproval]
 *      security:
 *          - BearerAuth: []  
 *      parameters:
 *          - name: "resolved"
 *            in: "path"
 *            description: "Resolution 0 or 1"
 *            required: true
 *            type: "integer"
 *            format: "int64"
 *      responses:
 *        "200":
 *          description: successful message is successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArtworkApproval'
 */

router.route('/byresolution/:resolved')
    .get(authorize([Role.Admin, Role.SuperAdmin]), artworkApprovalCtrl.getByResolution)


module.exports = router;