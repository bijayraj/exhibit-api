'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "exhibits", deps: []
 * createTable "members", deps: []
 * createTable "users", deps: []
 * createTable "artworks", deps: [exhibits, users]
 * createTable "artwork_assets", deps: [artworks]
 * createTable "exhibit_admins", deps: [users, exhibits]
 * createTable "refresh_tokens", deps: [users]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2022-09-03T04:42:55.876Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "exhibits",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description",
                        "allowNull": false
                    },
                    "location": {
                        "type": Sequelize.STRING,
                        "field": "location"
                    },
                    "address": {
                        "type": Sequelize.STRING,
                        "field": "address"
                    },
                    "visible": {
                        "type": Sequelize.BOOLEAN,
                        "field": "visible",
                        "defaultValue": true
                    },
                    "startDate": {
                        "type": Sequelize.DATE,
                        "field": "start_date",
                        "allowNull": false
                    },
                    "endDate": {
                        "type": Sequelize.DATE,
                        "field": "end_date"
                    },
                    "moreInfo": {
                        "type": Sequelize.STRING,
                        "field": "more_info"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "members",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "firstName": {
                        "type": Sequelize.STRING,
                        "allowNull": false,
                        "field": "first_name"
                    },
                    "lastName": {
                        "type": Sequelize.STRING,
                        "allowNull": false,
                        "field": "last_name"
                    },
                    "firstNameNepali": {
                        "type": Sequelize.STRING,
                        "field": "first_name_nepali"
                    },
                    "lastNameNepali": {
                        "type": Sequelize.STRING,
                        "field": "last_name_nepali"
                    },
                    "dob": {
                        "type": Sequelize.DATEONLY,
                        "field": "dob"
                    },
                    "startDate": {
                        "type": Sequelize.DATEONLY,
                        "field": "start_date"
                    },
                    "endDate": {
                        "type": Sequelize.DATEONLY,
                        "field": "end_date"
                    },
                    "photoUrl": {
                        "type": Sequelize.STRING,
                        "field": "photo_url"
                    },
                    "description": {
                        "type": Sequelize.TEXT,
                        "field": "description"
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "unique": true
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "users",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "username": {
                        "type": Sequelize.STRING,
                        "field": "username",
                        "unique": true,
                        "allowNull": false
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "allowNull": false
                    },
                    "memberId": {
                        "type": Sequelize.INTEGER,
                        "field": "member_id"
                    },
                    "firstName": {
                        "type": Sequelize.STRING,
                        "field": "first_name"
                    },
                    "lastName": {
                        "type": Sequelize.STRING,
                        "field": "last_name"
                    },
                    "organization": {
                        "type": Sequelize.STRING,
                        "field": "organization"
                    },
                    "occupation": {
                        "type": Sequelize.STRING,
                        "field": "occupation"
                    },
                    "photoUrl": {
                        "type": Sequelize.STRING,
                        "field": "photo_url"
                    },
                    "role": {
                        "type": Sequelize.STRING,
                        "field": "role"
                    },
                    "verificationToken": {
                        "type": Sequelize.STRING,
                        "field": "verification_token"
                    },
                    "resetToken": {
                        "type": Sequelize.STRING,
                        "field": "reset_token"
                    },
                    "resetTokenExpiry": {
                        "type": Sequelize.DATE,
                        "field": "reset_token_expiry"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "artworks",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "title": {
                        "type": Sequelize.STRING,
                        "field": "title",
                        "allowNull": false
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description",
                        "allowNull": false
                    },
                    "artType": {
                        "type": Sequelize.STRING,
                        "field": "art_type"
                    },
                    "moreInfo": {
                        "type": Sequelize.STRING,
                        "field": "more_info"
                    },
                    "approved": {
                        "type": Sequelize.BOOLEAN,
                        "field": "approved",
                        "defaultValue": false
                    },
                    "approvedDate": {
                        "type": Sequelize.DATE,
                        "field": "approved_date"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "ExhibitId": {
                        "type": Sequelize.INTEGER,
                        "field": "exhibit_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "exhibits",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "UserId": {
                        "type": Sequelize.INTEGER,
                        "field": "user_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "users",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "artwork_assets",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "title": {
                        "type": Sequelize.STRING,
                        "field": "title",
                        "allowNull": false
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description",
                        "allowNull": false
                    },
                    "address": {
                        "type": Sequelize.STRING,
                        "field": "address",
                        "allowNull": false
                    },
                    "assetType": {
                        "type": Sequelize.ENUM('0', '1', '2', '3', '4', '5', '6'),
                        "field": "asset_type",
                        "allowNull": false,
                        "defaultValue": 0
                    },
                    "visible": {
                        "type": Sequelize.BOOLEAN,
                        "field": "visible",
                        "defaultValue": true
                    },
                    "approved": {
                        "type": Sequelize.BOOLEAN,
                        "field": "approved",
                        "defaultValue": false
                    },
                    "approvedDate": {
                        "type": Sequelize.DATE,
                        "field": "approved_date"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "ArtworkId": {
                        "type": Sequelize.INTEGER,
                        "field": "artwork_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "artworks",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "exhibit_admins",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "expiryDate": {
                        "type": Sequelize.DATE,
                        "field": "expiry_date"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "UserId": {
                        "type": Sequelize.INTEGER,
                        "unique": "exhibit_admins_UserId_ExhibitId_unique",
                        "field": "user_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "users",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "ExhibitId": {
                        "type": Sequelize.INTEGER,
                        "unique": "exhibit_admins_UserId_ExhibitId_unique",
                        "field": "exhibit_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "exhibits",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "refresh_tokens",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "token": {
                        "type": Sequelize.STRING,
                        "field": "token"
                    },
                    "expiryDate": {
                        "type": Sequelize.DATE,
                        "field": "expiry_date"
                    },
                    "createdByIp": {
                        "type": Sequelize.STRING,
                        "field": "created_by_ip"
                    },
                    "revokedDate": {
                        "type": Sequelize.DATE,
                        "field": "revoked_date"
                    },
                    "revokedByIp": {
                        "type": Sequelize.STRING,
                        "field": "revoked_by_ip"
                    },
                    "replacedByToken": {
                        "type": Sequelize.STRING,
                        "field": "replaced_by_token"
                    },
                    "created_at": {
                        "type": Sequelize.DATE,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.DATE,
                        "field": "updated_at",
                        "allowNull": false
                    },
                    "UserId": {
                        "type": Sequelize.INTEGER,
                        "field": "user_id",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "users",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["artwork_assets", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["artworks", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["exhibit_admins", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["exhibits", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["members", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["refresh_tokens", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["users", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
