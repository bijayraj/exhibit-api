'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "approvedBy" to table "artwork_assets"
 * addColumn "onlyInHeadphone" to table "artwork_assets"
 * addColumn "visible" to table "artworks"
 * addColumn "approvedBy" to table "artworks"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2022-09-20T17:45:35.841Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "addColumn",
            params: [
                "artwork_assets",
                "approved_by",
                {
                    "type": Sequelize.INTEGER,
                    "field": "approved_by"
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
                "only_in_headphone",
                {
                    "type": Sequelize.BOOLEAN,
                    "field": "only_in_headphone"
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
                "visible",
                {
                    "type": Sequelize.BOOLEAN,
                    "field": "visible"
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
                "approved_by",
                {
                    "type": Sequelize.INTEGER,
                    "field": "approved_by"
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
                "approved_by",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "artwork_assets",
                "only_in_headphone",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "artworks",
                "visible",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "removeColumn",
            params: [
                "artworks",
                "approved_by",
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
