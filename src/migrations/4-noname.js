'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "artwork_approvals", deps: [artworks]
 *
 **/

var info = {
    "revision": 4,
    "name": "noname",
    "created": "2022-10-11T03:36:27.951Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "createTable",
        params: [
            "artwork_approvals",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "approvedBy": {
                    "type": Sequelize.INTEGER,
                    "field": "approved_by"
                },
                "approvedDate": {
                    "type": Sequelize.DATE,
                    "field": "approved_date"
                },
                "rejected": {
                    "type": Sequelize.BOOLEAN,
                    "field": "rejected",
                    "defaultValue": false
                },
                "comment": {
                    "type": Sequelize.TEXT,
                    "field": "comment"
                },
                "emailNotified": {
                    "type": Sequelize.BOOLEAN,
                    "field": "email_notified"
                },
                "additionalEmailMessage": {
                    "type": Sequelize.TEXT,
                    "field": "additional_email_message"
                },
                "resolved": {
                    "type": Sequelize.BOOLEAN,
                    "field": "resolved"
                },
                "resolveRequest": {
                    "type": Sequelize.INTEGER,
                    "field": "resolve_request"
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
    }];
};
var rollbackCommands = function(transaction) {
    return [{
        fn: "dropTable",
        params: ["artwork_approvals", {
            transaction: transaction
        }]
    }];
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
