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

    async getByTagId(id) {
        console.log(id)
        const artworkTag = await db.ArtworkTag.findOne({
            where: {
                uuid: id
            }
        });
        if (artworkTag) {
            const artwork = await db.Artwork.findOne({
                where: {
                    id: artworkTag.dataValues.ArtworkId,
                    approved: true,
                }
            });
            return artwork;
        }
        return null;

    }

}

module.exports = new ArtworkService()