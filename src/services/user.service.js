const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('../database/sequelize');
const Role = require('../models/role');
const APIError = require('../helpers/APIError');
const { execArgv } = require('process');


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
        if (!params.username)
        {
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
        user.role = isFirstAccount ? Role.Admin : Role.User;
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
        if (!refreshToken || !refreshToken.isActive) throw new APIError('Invalid token', 400);
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


    
 

    

}

module.exports = new UserService();