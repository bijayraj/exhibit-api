"use strict"
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../config');
const userService = require('../services/user.service');

class AuthController {
    async login(req, res, next) {
        const {
            username,
            password
        } = req.body;
        const ipAddress = req.ip || req.headers['x-real-ip'] || req.connection.remoteAddress;

        try {
            const userInfo = await userService.authenticate(username, password, ipAddress);
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


}

module.exports = new AuthController();