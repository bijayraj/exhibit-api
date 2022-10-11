const httpStatus = require('http-status');
const db = require('../database/sequelize');
const baseService = require('../services/base.service');
const APIError = require('../helpers/APIError');
const { PROXY_AUTHENTICATION_REQUIRED } = require('http-status');
const ArtworkAsset = db.ArtworkAsset;
const fs = require('fs')
const upload_dir = process.env.PORT || './uploads'

class ArtworkApprovalController {

    async create(req, res) {
        console.log('Reached here now');
        try {
            const dept = await new baseService(db.ArtworkApproval).create(req.body);
            res.json(dept);
        } catch (exception) {
            throw exception
        }
    }

    async requestApproval(req, res) {
        try {
            const dept = await new baseService(db.ArtworkApproval).create(req.body);
            res.json(dept);
        } catch (exception) {
            throw exception
        }
    }

    async list(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const depts = await new baseService(db.ArtworkApproval).list(page, pageSize);
        res.json(depts);
    }

    async update(req, res) {
        const dept = await new baseService(db.ArtworkApproval).update(req.params.id, req.body);
        res.json(dept);
    }

    async get(req, res) {
        const dept = await new baseService(db.ArtworkApproval).getOne(req.params.id);
        res.json(dept);
    }

    async remove(req, res) {
        const dept = await new baseService(db.ArtworkApproval).delete(req.params.id);
        res.json({
            message: `Object with id ${req.params.id} deleted!`
        });
    }

    async getByArtworkId(req, res) {
        const dept = await new baseService(db.ArtworkApproval).findByField({ ArtworkId: req.params.id });
        res.json(dept);
    }
}

module.exports = new ArtworkApprovalController()