const BaseService = require("./base.service");
const db = require('../database/sequelize');
const {
    paginate
} = require('../helpers/dbUtils');


class MemberService extends BaseService {

    constructor() {
        super(db.Member);
    }

    async getOne(id, include = []) {
        const attributeRequired = ['id', 'name'];
        const obj = await this.model.findByPk(id, {
            include: [{
                model: db.Batch,
                required: true,
                attributes: attributeRequired,
                include: [{
                    model: db.Program,
                    required: true,
                    attributes: attributeRequired,
                    include: [{
                        model: db.Department,
                        required: true,
                        attributes: attributeRequired
                    }]
                }]
            }]
        });
        return obj;
    }


    async list(page, pageSize, include = []) {
        const where = {};
        //Check where and construct the where query here!

        const obj = await this.model.findAll({
            include: include,
            ...paginate({
                page,
                pageSize
            })
        });

        return obj;
    }




}

module.exports = new MemberService()