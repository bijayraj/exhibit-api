const httpStatus = require('http-status');
const db = require('../database/sequelize');
const baseService = require('../services/base.service');
const APIError = require('../helpers/APIError');
const Exhibit = db.Exhibit;


class ExhibitController {

    async create(req, res) {
        try {
            const dept = await new baseService(db.Exhibit).create(req.body);
            res.json(dept);
        } catch (exception) {
            throw exception
        }
    }

    async list(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const depts = await new baseService(db.Exhibit).list(page, pageSize);
        res.json(depts);
    }

    async update(req, res) {
        const dept = await new baseService(db.Exhibit).update(req.params.id, req.body);
        res.json(dept);
    }

    async get(req, res) {
        const dept = await new baseService(db.Exhibit).getOne(req.params.id);
        res.json(dept);
    }

    async remove(req, res) {
        const dept = await new baseService(db.Exhibit).delete(req.params.id);
        res.json({
            message: `Object with id ${req.params.id} deleted!`
        });
    }

}

module.exports = new ExhibitController()