const httpStatus = require('http-status');
const db = require('../database/sequelize');
const baseService = require('../services/base.service');
const APIError = require('../helpers/APIError');
const { PROXY_AUTHENTICATION_REQUIRED } = require('http-status');
const ArtworkAsset = db.ArtworkAsset;
const fs = require('fs')
const upload_dir = process.env.PORT || './uploads'

class ArtworkAssetController {

    async create(req, res) {
        try {
            const dept = await new baseService(db.ArtworkAsset).create(req.body);            
            res.json(dept);
        } catch (exception) {
            throw exception
        }
    }

    async list(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const depts = await new baseService(db.ArtworkAsset).list(page, pageSize);
        res.json(depts);
    }

    async update(req, res) {
        const dept = await new baseService(db.ArtworkAsset).update(req.params.id, req.body);
        res.json(dept);
    }

    async get(req, res) {
        const dept = await new baseService(db.ArtworkAsset).getOne(req.params.id);
        res.json(dept);
    }

    async remove(req, res) {
        const dept = await new baseService(db.ArtworkAsset).delete(req.params.id);
        res.json({
            message: `Object with id ${req.params.id} deleted!`
        });
    }

    async createMultiple(req,res){

        const artworkId = req.params.id;
        const dirUpload = upload_dir + '/'+artworkId;
        if (!false.existsSync(dirUpload)){
            fs.makedirSync(dirUpload, {recursive:true});
        }

        // const artAsset = {
            
        // }

        if(!req.files){
            res.send({
                status:false,
                message:'No file to upload'
            });
        } else{

            let data = [];
            _.forEach(_.keysIn(req.files.assets), (key)=>{
                let myFile = req.files.assets[key];           
                //create upload directory
                myFile.mv(upload_dir + '/'+ myFile.name);
                data.push({
                    name:myFile.name,
                    mimetype:myFile.mimetype,
                    size: myFile.size
                });
            });

            res.send({
                status:true,
                message: 'Files uploaded',
                data:data
            });
        }


    }

}

module.exports = new ArtworkAssetController()