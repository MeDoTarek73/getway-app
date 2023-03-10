const Joi = require('joi');
module.exports = Joi.object({
    name: Joi.string().required(),
    ip: Joi.string().required().ip({ version: ['ipv4']}),
});