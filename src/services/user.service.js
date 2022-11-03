const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('../database/sequelize');
const Role = require('../models/role');
const APIError = require('../helpers/APIError');
const { execArgv } = require('process');
const { send } = require('../helpers/emailer_basic');
const sendEmail = require('../helpers/emailer_basic');

class UserService {
    async authenticate(
        uName,
        password,
        ipAddress
    ) {
        console.log('REACHED HERE 1');
        const user = await db.User.findOne({
            where: {
                username: uName
            }
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new APIError('Authentication error, Username or password did not match', httpStatus.UNAUTHORIZED, true);
        }

        const jwtToken = this.generateJwtToken(user);
        const refreshToken = this.generateRefreshToken(user, ipAddress);

        console.log('HEY REACHED HERE!!');
        //Save refresh token
        await refreshToken.save();

        return {
            ...this.basicDetails(user),
            jwtToken,
            refreshToken: refreshToken.token
        };
    }


    async register(params, origin) {
        // validate
        if (!params.username) {
            params.username = params.email;
        }
        // console.log('REached here');
        // console.log(params);

        if (await db.User.findOne({
            where: {
                username: params.username
            }
        })) {
            // send already registered error in email to prevent account enumeration
            // return await sendAlreadyRegisteredEmail(params.email, origin);
        }

        // create account object
        const user = db.User.build(params);

        // first registered account is an admin
        const isFirstAccount = (await db.User.count()) === 0;

        // user.role = isFirstAccount ? Role.Admin : Role.User;
        user.role = params.role;

        user.verificationToken = this.randomTokenString();
        // hash password
        user.password = this.hash(params.password);
        // save account
        await user.save();
        // send email
        // await sendVerificationEmail(account, origin);
    }

    generateJwtToken(user) {
        return jwt.sign({
            id: user.id
        }, config.jwtSecret, {
            expiresIn: '15m'
        });
    }

    generateRefreshToken(user, ipAddress) {
        return db.RefreshToken.build({
            UserId: user.id,
            token: this.randomTokenString(),
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            createdByIp: ipAddress
        });

    }

    randomTokenString() {
        return crypto.randomBytes(40).toString('hex');
    }

    basicDetails(user) {
        const {
            id,
            username,
            firstName,
            lastName,
            role
        } = user;
        return {
            id,
            username,
            firstName,
            lastName,
            role
        };
    }

    basicDetailsWithoutUsername(user) {
        const basicDetails = this.basicDetails(user);
        delete basicDetails['username'];
        return { ...basicDetails };
    }

    hash(password) {
        return bcrypt.hashSync(password, 10);
    }

    async getRefreshToken(token) {
        const refreshToken = await db.RefreshToken.findOne({
            where: {
                token: token
            },
            include: ['User']
        });
        if (!refreshToken || !refreshToken.isActive) throw new APIError('Invalid refresh token', 400);
        return refreshToken;
    }

    async refreshToken({
        token,
        ipAddress
    }) {
        const refreshToken = await this.getRefreshToken(token);
        const user = refreshToken.User;

        // replace old refresh token with a new one and save
        const newRefreshToken = this.generateRefreshToken(user, ipAddress);

        refreshToken.revokedDate = Date.now();
        refreshToken.revokedByIp = ipAddress;
        refreshToken.replacedByToken = newRefreshToken.token;

        const affected = await refreshToken.save();
        await newRefreshToken.save();

        // generate new jwt
        const jwtToken = this.generateJwtToken(user);

        // return basic details and tokens
        return {
            ...this.basicDetails(user),
            jwtToken,
            refreshToken: newRefreshToken.token
        };
    }


    async revokeToken({
        token,
        ipAddress
    }) {
        const refreshToken = await this.getRefreshToken(token);
        // revoke token and save
        refreshToken.revoked = Date.now();
        refreshToken.revokedByIp = ipAddress;
        await refreshToken.save();
    }


    async getById(id) {
        const user = await db.User.findByPk(id);
        return {
            ...this.basicDetails(user)
        }

    }


    async updateUser(id, params) {
        console.log('THE ID IS...')
        console.log(id);
        const filteredParams = this.basicDetailsWithoutUsername(params);

        const mObj = await db.User.update(params, {
            returning: true,
            plain: true,
            where: {
                id: id
            }
        });
        console.log(mObj);
        //Sends an array [updatedObj, no_of_rows updated]
        return mObj;
    }

    async deleteUser(id, params) {

    }

    async getAdmins() {
        const admins = db.User.findAll({
            attributes: ['username'],
            where: {
                role: 'Admin'
            }
        });
        return admins
    }

    async getByUserName(uName) {
        const user = await db.User.findOne({
            where: {
                username: uName
            },
            raw: true
        });
        return user;
    }

    async forgotPassword(userInfo) {
        const token = jwt.sign({
            id: userInfo.id,
            type: 'reset'
        }, config.jwtSecret, {
            expiresIn: '60m'
        });

        const mObj = await db.User.update({ resetToken: token }, {
            returning: true,
            plain: true,
            where: {
                id: userInfo.id
            }
        });
        userInfo.resetToken = token
        sendEmail.sendForgotPasswordEmail(userInfo);
    }


    async resetForgottenPassword(token, newpassword) {
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            const userId = decoded.id;
            const userInfo = await db.User.findOne({
                where: {
                    id: userId,
                    resetToken: token
                },
                raw: true
            });
            if (userInfo && userInfo.resetToken != '') {
                const newHasedPass = this.hash(newpassword)
                const mObj = await db.User.update({ password: newHasedPass, resetToken: '' }, {
                    returning: true,
                    plain: true,
                    where: {
                        id: userInfo.id
                    }
                });

                return { status: true, mObj };
            }

        } catch (err) {
            // err
            return { status: false, message: err };
        }


    }




}

module.exports = new UserService();