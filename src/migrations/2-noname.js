'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "longDescription" to table "artwork_assets"
 * addColumn "displayOrder" to table "artwork_assets"
 * addColumn "autoPlay" to table "artwork_assets"
 * addColumn "longDescription" to table "artworks"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2022-09-20T03:48:01.533Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "addColumn",
            params: [
                "artwork_assets",
                "long_description",
                {
                    "type": Sequelize.TEXT,
                    "field": "long_description"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "artwork_assets",
                "display_order",
                {
                    "type": Sequelize.INTEGER,
                    "field": "display_order"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "artwork_assets",
                "auto_play",
                {
                    "type": Sequelize.BOOLEAN,
                    "field": "auto_play"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "artworks",
                "long_description",
                {
                    "type": Sequelize.TEXT,
                    "field": "long_description"
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
                "artwork_assets",
                "long_description",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "artwork_assets",
                "display_order",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "artwork_assets",
                "auto_play",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "artworks",
                "long_description",
                {
                    transaction: transaction
                }
            ]
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
