const httpStatus = require('http-status');
const db = require('../database/sequelize');
const userService = require('../services/user.service');
const User = db.User;
const crypto = require('crypto');
const pwdGenerator = require('generate-password');
const emailSender = require('../helpers/emailer_old')
class UserController {
    /**
     * Load user and append to req.
     */
    async load(req, res, next, id) {
        try {
            const userFoundResponse = await db.User.findByPk(id);
            if (!userFoundResponse) {
                const e = new Error('User does not exist');
                e.status = httpStatus.NOT_FOUND;
                return next(e);
            }
            req.user = userFoundResponse; // eslint-disable-line no-param-reassign
            return next();
        } catch (error) {
            return next(error);
        }
    }

    /**
     * Get user
     * @returns {User}
     */
    get(req, res) {
        return res.json(req.user);
    }


    create(req, res, next) {
        userService.register(req.body, req.get('origin'))
            .then(() => res.json({
                message: 'Registration successful, please check your email for verification instructions'
            }))
            .catch(next);
    }



    registerNew(req, res) {
        console.log('Registering user');
        const newPassword = pwdGenerator.generate({
            length: 10,
            numbers: true
        }); //'admin@123';//generatePassword(length = 8);
        const userInfo = req.body;
        userInfo.username = userInfo.username.toLowerCase();
        userInfo.password = newPassword;
        userService.register(userInfo, req.get('origin'))
            .then(() => {
                emailSender.sendUserCreationEmail(userInfo);
                res.json({
                    message: 'Registration successful, please check your email for verification instructions'
                });
            })
            .catch(err => {
                console.log(err);
            });
    }



    async getById(req, res) {
        const user = await userService.getById(req.params.id);
        res.json(user);
    }

    async updateById(req, res) {
        const user = await userService.updateUser(req.params.userId, req.body);
        res.json(user);
    }


    /**
     * Update existing user
     * @property {string} req.body.username - The username of user.
     * @returns {User}
     */
    update(req, res, next) {
        const user = req.user;
        user.username = req.body.username;
        user.role = req.body.role;

        user
            .save()
            .then(savedUser => res.json(savedUser))
            .catch(e => next(e));
    }

    /**
     * Get user list.
     * @property {number} req.query.skip - Number of users to be skipped.
     * @property {number} req.query.limit - Limit number of users to be returned.
     * @returns {User[]}
     */
    list(req, res, next) {
        const {
            limit = 50
        } = req.query;
        User.findAll({
            limit
        })
            .then(users => res.json(users))
            .catch(e => next(e));
    }

    /**
     * Delete user.
     * @returns {User}
     */
    // remove(req, res, next) {
    //     const user = req.user;
    //     const username = req.user.username;
    //     user
    //         .destroy()
    //         .then(() => res.json(username))
    //         .catch(e => next(e));
    // }

    async remove(req, res) {
        const dept = await userService.delete(req.params.id);
        res.json({
            message: `Object with id ${req.params.id} deleted!`
        });
    }





}

module.exports = new UserController()