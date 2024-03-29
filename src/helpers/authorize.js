const jwt = require('express-jwt');
const secret = require('../config').jwtSecret;
const db = require('../database/sequelize');

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({
            secret,
            algorithms: ['HS256']
        }),
        // authorize based on user role
        async (req, res, next) => {
            const user = await db.User.findByPk(req.user.id);
            console.log(req.user.id);

            const refreshTokens = await db.RefreshToken.findAll({
                where: {
                    UserId: user.id
                }
            });

            if (!user || (roles.length && !roles.includes(user.role))) {
                // user no longer exists or role not authorized
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }

            // authentication and authorization successful
            req.user.role = user.role;
            req.user.username = user.username;
            req.user.firstName = user.firstName;
            req.user.lastName = user.lastName;
            req.user.photoUrl = user.photoUrl;
            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
            next();
        }
    ];
}