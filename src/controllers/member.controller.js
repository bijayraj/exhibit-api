const httpStatus = require('http-status');
const db = require('../database/sequelize');
const memberService = require('../services/member.service');
const APIError = require('../helpers/APIError');
const Member = db.Member;


class MemberController {

    async create(req, res, next) {
        try {
            const dept = await memberService.create(req.body);
            res.json(dept);
        } catch (exception) {
            next(exception)
        }
    }

    async list(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const depts = await memberService.list(page, pageSize);
        res.json(depts);
    }

    async update(req, res) {
        const dept = await memberService.update(req.params.id, req.body);
        res.json(dept);
    }

    async get(req, res) {
        const dept = await memberService.getOne(req.params.id);
        res.json(dept);
    }

    async remove(req, res) {
        const dept = await memberService.delete(req.params.id);
        res.json({
            message: `Object with id ${req.params.id} deleted!`
        });
    }

}

module.exports = new MemberController()