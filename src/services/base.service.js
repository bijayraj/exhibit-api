const db = require('../database/sequelize');
const APIError = require('../helpers/APIError');

const {
    paginate
} = require('../helpers/dbUtils');
const sequelize = require('../database/sequelize');


const Sequelize = require('sequelize');
const {
    ValidationError
} = require('sequelize');

class BaseService {

    constructor(dbModel) {
        this.model = dbModel;
    }

    async list(page, pageSize, include = []) {
        const obj = await this.model.findAll({
            include: include,
            ...paginate({
                page,
                pageSize
            })
        });

        return obj;
    }

    async count() {
        return await this.dbModel.count();
    }

    async getOne(id, include = []) {
        const obj = await this.model.findByPk(id, {
            include: include
        });
        return obj;
    }

    async create(params) {
        try {
            const mObj = await this.model.create(params);
            return mObj;
        } catch (exception) {
            throw exception;
        }
    }

    async update(id, params) {
        const mObj = await this.model.update(params, {
            returning: true,
            plain: true,
            where: {
                id: id
            }
        });
        //Sends an array [updatedObj, no_of_rows updated]
        return mObj;
    }


    async delete(id) {
        const mObj = await this.model.findByPk(id);
        await mObj.destroy();
    }



}

module.exports = BaseService;