const httpStatus = require('http-status');
const db = require('../database/sequelize');
const baseService = require('../services/base.service');
const { Configuration, OpenAIApi } = require("openai");
const artworkTagService = require('../services/artwork-tag.service');
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


class ArtworkTagController {

    async create(req, res) {
        try {
            req.body.UserId = req.user.id;
            // const dept = await new baseService(db.ArtworkTag).create(req.body);
            const dept = await artworkTagService.upsert(req.body);
            res.json(dept);
        } catch (exception) {
            throw exception
        }
    }

    async list(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const user = req.user;
        const depts = await new baseService(db.ArtworkTag).list(page, pageSize);
        res.json(depts);
    }

    async listByArtwork(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const artworkId = req.params.id
        const depts = await new baseService(db.ArtworkTag).findByField({ ArtworkId: artworkId });
        res.json(depts)
    }

    async update(req, res) {
        const dept = await artworkTagService.update(req.params.id, req.body);
        res.json(dept);
    }

    async get(req, res) {
        const dept = await new baseService(db.ArtworkTag).getOne(req.params.id, [{ model: db.Artwork }]);
        res.json(dept);
    }

    async remove(req, res) {
        const dept = await new baseService(db.ArtworkTag).delete(req.params.id);
        res.json({
            message: `Object with id ${req.params.id} deleted!`
        });
    }

    async getTagCountForArtwork(req, res) {
        const dept = await db.ArtworkTag.count({
            where: { ArtworkId: req.params.id },
        });

        res.json({
            count: dept
        });
    }


}

module.exports = new ArtworkTagController()