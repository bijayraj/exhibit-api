const BaseService = require("./base.service");
const db = require('../database/sequelize');
const {
    paginate
} = require('../helpers/dbUtils');



class ArtworkService extends BaseService {

    constructor() {
        super(db.Artwork);
    }

    async getByUserId(id, page, pageSize) {

        const obj = await this.model.findAll({
            where: {
                user_id: id
            },
            include: [db.Exhibit, db.ArtworkAsset],
            ...paginate({
                page,
                pageSize
            })
        });
        return obj;
    }

    async getByExhibitId(id, page, pageSize) {
        const obj = await this.model.findAll({
            where: {
                exhibit_id: id
            },
            include: [db.User, db.ArtworkAsset],
            ...paginate({
                page,
                pageSize
            })
        });

        return obj;
    }

}

module.exports = new ArtworkService()