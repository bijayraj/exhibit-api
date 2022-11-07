const BaseService = require("./base.service");
const db = require('../database/sequelize');
const {
    paginate
} = require('../helpers/dbUtils');
const md5File = require('md5-file')



class ArtworkService extends BaseService {

    constructor() {
        super(db.Artwork);
    }

    async list(page, pageSize, include = ['User']) {
        const obj = await db.Artwork.findAll({
            include: include,
            attributes: {
                include: [[db.sequelize.literal(`(
                SELECT COUNT(artwork_tags.uuid)
                FROM artwork_tags
                WHERE artwork_tags.artwork_id = artwork.id
              )`),
                    'tagCount',]]
            },
            ...paginate({
                page,
                pageSize
            })
        });

        return obj;

    }

    async listOnlyOwn(user, page, pageSize, include = []) {

        const obj = await db.Artwork.findAll({
            where: {
                UserId: user.id
            },
            include: include,
            attributes: {
                include: [[db.sequelize.literal(`(
                SELECT COUNT(artwork_tags.uuid)
                FROM artwork_tags
                WHERE artwork_tags.artwork_id = artwork.id
              )`),
                    'tagCount',]]
            },
            ...paginate({
                page,
                pageSize
            })
        });

        return obj;
    }

    async getByUserId(id, page, pageSize) {

        const obj = await this.model.findAll({
            where: {
                user_id: id
            },
            include: [db.Exhibit, db.ArtworkAsset, db.User],
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

    async getTagMd5() {
        // /* Async usage */
        md5File('LICENSE.md').then((hash) => {
            console.log(`The MD5 sum of LICENSE.md is: ${hash}`);
        })
    }

}

module.exports = new ArtworkService()