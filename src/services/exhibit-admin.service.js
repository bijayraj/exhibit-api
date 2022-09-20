const BaseService = require("./base.service");
const db = require('../database/sequelize');
const {
    paginate
} = require('../helpers/dbUtils');



class ExhibitAdminService extends BaseService {

    constructor() {
        super(db.ExhibitAdmin);
    }

    async create(params) {
        try {
            const mObj = await this.model.create(params, {
                include: [{
                    model: db.User
                }]
            });
            return mObj;
        } catch (exception) {
            throw exception;
        }
    }

    async getByUserId(id) {
        const obj = await this.model.findAll({
            where: {
                user_id: id
            },
            include: [db.Exhibit]
        });

        return obj;
    }

    async getByExhibitId(id) {
        const obj = await this.model.findAll({
            where: {
                exhibit_id: id
            },
            include: [db.User]
        });

        return obj;
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


    async addAdminToExhibit(userId, exhibitId) {
        const user = await db.User.findByPk(userId);
        const exhibit = await db.Exhibit.findByPk(exhibitId);
        const obj = user.addExhibit(exhibit);
        return obj;
    }





}

module.exports = new ExhibitAdminService()