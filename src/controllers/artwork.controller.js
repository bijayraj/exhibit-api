const httpStatus = require('http-status');
const db = require('../database/sequelize');
const baseService = require('../services/base.service');
const APIError = require('../helpers/APIError');
const artworkService = require('../services/artwork.service');
const Artwork = db.Artwork;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


class ArtworkController {

    async create(req, res) {
        try {
            const dept = await new baseService(db.Artwork).create(req.body);
            // if (req.body.assets){
            //     req.body.assets.forEach(element => {
            //         dept.addArtworkAsset(element)
            //     });               

            // }
            res.json(dept);
        } catch (exception) {
            throw exception
        }
    }

    async list(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const depts = await new baseService(db.Artwork).list(page, pageSize);
        res.json(depts);
    }

    async update(req, res) {
        const dept = await new baseService(db.Artwork).update(req.params.id, req.body);
        res.json(dept);
    }

    async get(req, res) {
        const dept = await new baseService(db.Artwork).getOne(req.params.id, [{ model: db.ArtworkAsset }]);
        res.json(dept);
    }

    async remove(req, res) {
        const dept = await new baseService(db.Artwork).delete(req.params.id);
        res.json({
            message: `Object with id ${req.params.id} deleted!`
        });
    }

    async listByUser(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const depts = await artworkService.getByUserId(req.params.id, page, pageSize);
        res.json(depts);
    }


    async askQuestion(req, res) {
        const id = req.params.id;
        const question = req.body.question;
        const artWork = await new baseService(db.Artwork).getOne(req.params.id);

        if (!artWork) {
            res.json({
                message: `Artwork not found.`
            });
        } else {
            const promptBackground = artWork.longDescription;
            let responseText = "Sorry! No information found.";

            const response = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: `${promptBackground}\n${question}\n`,
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            console.log(response);
            if (response.data.choices && response.data.choices.length > 0) {
                responseText = response.data.choices[0].text;
            }

            res.json({
                message: responseText
            });

        }



    }

}

module.exports = new ArtworkController()