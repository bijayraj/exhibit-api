const sjs = require('sequelize-json-schema');
const db = require('./database/sequelize');
const YAML = require('yamljs');
const j2s = require('joi-to-swagger');
const path = require('path');

const {
    replace
} = require('lodash');

jsonSchema = sjs.getSequelizeSchema(db.sequelize);
// const obj = JSON.parse(jsonSchema);

const obj = jsonSchema;
obj.components = {
    schemas: 'NULL'
};

obj.components.schemas = obj.definitions;

delete obj.type;
delete obj['$schema'];
delete obj.definitions;

json = JSON.stringify([obj]);
YAMLSchema = YAML.stringify(jsonSchema, 8);
const replaceRegularExp = /\#\/definitions\//g

YAMLSchema = YAMLSchema.replace(replaceRegularExp, `#/components/schemas/`);
// console.log(YAMLSchema);

fs = require('fs');
fs.writeFile('./src/auto-sequelize-models.yaml', YAMLSchema, function (err) {
    if (err) return console.log(err);
    console.log('file_saved');
});

valJoiObj = {};
valJoiObj.components = {};
valJoiObj.components.schemas = {};

const modelsDir = path.normalize(`${__dirname}/models`);
// loop through all files in models directory ignoring hidden files and this file
fs
    .readdirSync(modelsDir)
    .filter(file => file.indexOf('.') !== 0 && file.indexOf('.map') === -1 && file.indexOf('.model.') > -1)
    // import model files and save model names
    .forEach((file) => {
        let fileBaseName = file.substr(0, file.indexOf('.'));
        // fileBaseName = fileBaseName.replace('-', '_');
        fileBaseName = formatString(fileBaseName);

        console.info(`Loading model file ${file}`);
        const model = require(path.join(modelsDir, file));

        Object.getOwnPropertyNames(model).forEach((name, idx, array) => {
            // console.log(name + '\n');
            if (name.indexOf('validation') > -1) {
                const validationObject = model[name];
                if (validationObject) {
                    const {
                        swagger,
                        components
                    } = j2s(validationObject, []);
                    const keyName = fileBaseName + name.replace('validation', '');
                    valJoiObj.components.schemas[keyName] = swagger
                    // console.log(swagger);
                }
            }
        });
    });

//Change to PascalCase
function formatString(s) {
    let st = s.replace('-', '_');
    st = st.replace(/(\w)(\w*)/g,
        function (g0, g1, g2) {
            return g1.toUpperCase() + g2.toLowerCase();
        });
    return st;
}


// json = JSON.stringify([valJoiObj]);

YAMLSchema = YAML.stringify(valJoiObj, 8);
YAMLSchema = YAMLSchema.replace(replaceRegularExp, `#/components/schemas/`);
// console.log(YAMLSchema);
fs = require('fs');
fs.writeFile('./src/auto-joi-swagger.yaml', YAMLSchema, function (err) {
    if (err) return console.log(err);
    console.log('Auto joi swagger file_saved');
});

console.log(jsonSchema)
console.log(valJoiObj)