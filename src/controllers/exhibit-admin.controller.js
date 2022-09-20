const httpStatus = require('http-status');
const db = require('../database/sequelize');
const ExhibitAdminService = require('../services/exhibit-admin.service');
const APIError = require('../helpers/APIError');
const ExhibitAdmin = db.ExhibitAdmin;


class ExhibitAdminController {

    async create(req, res) {
        try {
            const dept = await ExhibitAdminService.create(req.body);
            res.json(dept);
        } catch (exception) {
            throw exception
        }
    }

    async list(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const depts = await ExhibitAdminService.list(page, pageSize, [db.Exercise]);
        res.json(depts);
    }

    async update(req, res) {
        const dept = await ExhibitAdminService.update(req.params.id, req.body);
        res.json(dept);
    }

    async get(req, res) {
        const dept = await ExhibitAdminService.getOne(req.params.id);
        res.json(dept);
    }

    async remove(req, res) {
        const dept = await ExhibitAdminService.delete(req.params.id);
        res.json({
            message: `Object with id ${req.params.id} deleted!`
        });
    }

    async getByUser(req, res) {
        const depts = await ExhibitAdminService.getByUserId(req.params.id);
        res.json(depts);
    }

    async getByExhibit(req, res) {
        const depts = await ExhibitAdminService.getByExhibitId(req.params.id);
        res.json(depts);
    }

    async addExhibitAdmin(req, res) {
        const depts = await ExhibitAdminService.addAdminToExhibit(req.body.user_id, req.body.exhibit_id);
        res.json(depts);
    }

}

module.exports = new ExhibitAdminController()