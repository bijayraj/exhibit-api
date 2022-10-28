const httpStatus = require('http-status');
const db = require('../database/sequelize');
const baseService = require('../services/base.service');
const APIError = require('../helpers/APIError');
const { PROXY_AUTHENTICATION_REQUIRED } = require('http-status');
const ArtworkAsset = db.ArtworkAsset;
const fs = require('fs');
const artworkApprovalService = require('../services/artwork-approval.service');
const artworkService = require('../services/artwork.service');
const { sendApprovalRequestEmail } = require('../helpers/emailer_old');
const upload_dir = process.env.PORT || './uploads'

class ArtworkApprovalController {

    async create(req, res) {
        console.log('Reached here now');
        const user = req.user;
        try {
            req.body.UserId = user.id;
            const dept = await new baseService(db.ArtworkApproval).create(req.body);
            res.json(dept);
        } catch (exception) {
            throw exception
        }
    }

    async requestApproval(req, res) {
        try {
            req.body.UserId = req.user.id;
            const dept = await artworkApprovalService.requestApproval(req.body);
            const artwork = await db.Artwork.findByPk(req.body.ArtworkId);
            sendApprovalRequestEmail(artwork, req.user).then(f => console.log(f));
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
        const dept = await db.ArtworkApproval.findOne({
            where: { ArtworkId: req.params.id },
            order: [['id', 'DESC']],
        });
        res.json(dept);
    }

    async getByResolution(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const byResolution = req.params.resolved;
        const depts = await artworkApprovalService.getListByResolution(byResolution == 1, page, pageSize);
        res.json(depts);

    }

    async approveReject(req, res) {
        const user = req.user;
        const approveResult = await artworkApprovalService.approveArtwork(req.params.id, user, req.params.reject == 1, req.body.comment);
        res.json({ message: 'Approval/Rejection complete' })
    }
}

module.exports = new ArtworkApprovalController()