const fs = require('fs');
const path = require('path');
let schemaObj = {};
const validator = (schema) => (payload) => {
    return schema.validateAsync(payload, { abortEarly: false }).then(res => res).catch(_err => {
        let err = new Error();
        err.statusCode = 400;
        err.status = 'Fail';
        err.message = _err.details.map(detail => detail.message.replace(/"/g, ''));
        throw err;
    });
};
const schemas = fs.readdirSync(path.join(__dirname, 'dto'), { withFileTypes: true })
    .reduce((files, file) => {
        return files.concat(file.isDirectory() ? fs.readdirSync(path.join(__dirname, 'dto', file.name)).map(f => path.join(file.name, f)) : file.name);
    }, []);
schemas.forEach(schema => {
    const sch = require('./dto/' + schema.replace('.js', ''))
    schemaObj["validate_" + schema.replace('/', '_').replace('.request.js', '')] = validator(sch);
});
module.exports = schemaObj;