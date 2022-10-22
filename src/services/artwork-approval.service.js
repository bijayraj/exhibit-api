const BaseService = require("./base.service");
const db = require('../database/sequelize');
const {
    paginate
} = require('../helpers/dbUtils');



class ArtworkApprovalService extends BaseService {

    constructor() {
        super(db.ArtworkApproval);
    }

    async getListByResolution(resolved, page, pageSize) {
        let whereCl = {
            resolved: resolved
        };

        // if (resolved == 0) {
        //     whereCl = {
        //         resolved: {
        //             $or: {
        //                 $eq: null,
        //                 $eq: 0
        //             }
        //         }
        //     };

        // }
        const obj = await this.model.findAll({
            where: whereCl,
            include: [db.User, db.Artwork],
            ...paginate({
                page,
                pageSize
            })
        });
        return obj;
    }

    async requestApproval(body) {

        const result = await db.sequelize.transaction(async (t) => {

            const artworkObject = await db.Artwork.update({ approved: false, underReview: true }, {
                returning: true,
                plain: true,
                where: {
                    id: body.ArtworkId
                }
            });
            body.resolved = false;
            const mObj = await db.ArtworkApproval.create(body);
            return mObj;
        });
        return result;
    }

    async approveArtwork(id, user, rejected = false, comment = '') {
        const result = await db.sequelize.transaction(async (t) => {
            const artworkApproval = await db.ArtworkApproval.findByPk(id);
            if (!artworkApproval) {
                console.log('No Artwork found');
                return false;
            }
            const artworkId = artworkApproval.ArtworkId;


            const artworkObject = await db.Artwork.update({ approvedBy: user.id, approved: !rejected, approvedDate: new Date(), underReview: false }, {
                returning: true,
                plain: true,
                where: {
                    id: artworkId
                }
            });

            const artworkApprovalUpdate = await db.ArtworkApproval.update(
                {
                    approvedBy: user.id,
                    approvedDate: new Date(),
                    resolved: true,
                    rejected: rejected,
                    comment: comment
                }, {
                returning: true,
                plain: true,
                where: {
                    id: id
                }
            });
            return true;
        });

        if (result) {
            console.log("Approval Complete")
        }
    }


}

module.exports = new ArtworkApprovalService()