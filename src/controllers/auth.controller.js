"use strict"
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../config');
const userService = require('../services/user.service');
const { sendForgotPasswordEmail } = require('../helpers/emailer_basic');

class AuthController {
    async login(req, res, next) {
        const {
            username,
            password
        } = req.body;
        const ipAddress = req.ip || req.headers['x-real-ip'] || req.connection.remoteAddress;

        try {
            const userInfo = await userService.authenticate(username.toLowerCase(), password, ipAddress);
            res.json(userInfo)
        } catch (exception) {
            return next(exception);
        }

    }

    refreshToken(req, res, next) {
        const token = req.query.refreshToken || req.body.refreshToken;
        const ipAddress = req.ip;
        userService.refreshToken({
            token,
            ipAddress
        })
            .then((info) => {
                res.json(info);
            })
            .catch(next);
    }

    revokeToken(req, res, next) {
        // accept token from request body or cookie
        const token = req.query.refreshToken || req.body.token;
        const ipAddress = req.ip || req.headers['x-real-ip'] || req.connection.remoteAddress;

        if (!token) return res.status(400).json({
            message: 'Token is required'
        });

        // users can revoke their own tokens and admins can revoke any tokens
        if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        userService.revokeToken({
            token,
            ipAddress
        })
            .then(() => res.json({
                message: 'Token revoked'
            }))
            .catch(next);
    }

    async forgotPassword(req, res) {
        const username = req.params.username;
        console.log('Searching with username');
        console.log(username);
        const userInfo = await userService.getByUserName(username.toLowerCase());
        console.log('found user info')
        console.log(userInfo);

        let result = { success: true }

        if (userInfo) {
            result = await userService.forgotPassword(userInfo);
        }
        res.json(result)
    }

    async resetForgottenPassword(req, res) {
        const token = req.body.token;
        const password = req.body.password;
        const result = await userService.resetForgottenPassword(token, password);
        if (result.status) {
            res.json(result);

        } else {
            return res.status(400).json({
                message: 'Token is invalid'
            });
        }
    }


}

module.exports = new AuthController();