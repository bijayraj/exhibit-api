'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "artworks", deps: [exhibits, users]
 * createTable "artwork_assets", deps: [artworks]
 * addColumn "photoUrl" to table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2022-02-01T23:21:33.587Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
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
                        "type": Sequelize.ENUM('0', '1', '2'),
                        "field": "asset_type"
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
            fn: "addColumn",
            params: [
                "users",
                "photo_url",
                {
                    "type": Sequelize.STRING,
                    "field": "photo_url"
                },
                {
                    transaction: transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "removeColumn",
            params: [
                "users",
                "photo_url",
                {
                    transaction: transaction
                }
            ]
        },
        {
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
