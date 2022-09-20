const httpStatus = require('http-status');
const db = require('../database/sequelize');
const baseService = require('../services/base.service');
const APIError = require('../helpers/APIError');
const artworkService = require('../services/artwork.service');
const Artwork = db.Artwork;


class ArtworkController {

    async create(req, res) {
        try {
            const dept = await new baseService(db.Artwork).create(req.body);
            // if (req.body.assets){
            //     req.body.assets.forEach(element => {
            //         dept.addArtworkAsset(element)
            //     });               

            // }
            res.json(dept);
        } catch (exception) {
            throw exception
        }
    }

    async list(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const depts = await new baseService(db.Artwork).list(page, pageSize);
        res.json(depts);
    }

    async update(req, res) {
        const dept = await new baseService(db.Artwork).update(req.params.id, req.body);
        res.json(dept);
    }

    async get(req, res) {
        const dept = await new baseService(db.Artwork).getOne(req.params.id, [{ model: db.ArtworkAsset }]);
        res.json(dept);
    }

    async remove(req, res) {
        const dept = await new baseService(db.Artwork).delete(req.params.id);
        res.json({
            message: `Object with id ${req.params.id} deleted!`
        });
    }

    async listByUser(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const depts = await artworkService.getByUserId(req.params.id, page, pageSize);
        res.json(depts);
    }

}

module.exports = new ArtworkController()