'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "artwork_tags", deps: [users, artworks]
 * addColumn "ArtworkTagUuid" to table "artwork_approvals"
 *
 **/

var info = {
    "revision": 8,
    "name": "noname",
    "created": "2022-11-03T01:02:41.145Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "artwork_tags",
                {
                    "uuid": {
                        "type": Sequelize.STRING,
                        "field": "uuid",
                        "primaryKey": true
                    },
                    "active": {
                        "type": Sequelize.BOOLEAN,
                        "field": "active",
                        "defaultValue": true
                    },
                    "location": {
                        "type": Sequelize.STRING,
                        "field": "location"
                    },
                    "description": {
                        "type": Sequelize.TEXT,
                        "field": "description"
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
                "artwork_approvals",
                "artwork_tag_uuid",
                {
                    "type": Sequelize.STRING,
                    "field": "artwork_tag_uuid",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "artwork_tags",
                        "key": "uuid"
                    },
                    "allowNull": true
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
                "artwork_approvals",
                "artwork_tag_uuid",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "dropTable",
            params: ["artwork_tags", {
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
