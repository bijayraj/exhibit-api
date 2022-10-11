module.exports = function (app) {
    app.use('/api/v1', require('./unauth.routes'));
    app.use('/api/v1/user', require('./user.routes'));
    app.use('/api/v1/member', require('./member.routes'));
    app.use('/api/v1/exhibit', require('./exhibit.routes'));
    app.use('/api/v1/exhibit-admin', require('./exhibit-admin.routes'));
    app.use('/api/v1/artwork', require('./artwork.routes'));
    app.use('/api/v1/artwork-asset', require('./artwork-asset.routes'));
    app.use('/api/v1/artwork-approval', require('./artwork-approval.routes'));

}