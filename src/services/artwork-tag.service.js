const BaseService = require("./base.service");
const db = require('../database/sequelize');
const {
    paginate
} = require('../helpers/dbUtils');



class ArtworkTagService extends BaseService {

    constructor() {
        super(db.Artwork);
    }

    async update(id, params) {
        const mObj = await this.model.update(params, {
            returning: true,
            plain: true,
            where: {
                uuid: id
            }
        });
        return mObj;
    }

    async upsert(params) {
        const mObj = await this.model.upsert(params);
        return mObj;
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

    async getByTagId(id) {
        const artworkTag = db.ArtworkTag.findByPk(id);
        const artwork = db.Artwork.fingByPk(artworkTag.ArtworkId);
        return artwork;
    }

}

module.exports = new ArtworkTagService()