const Joi = require('joi');
module.exports = Joi.object({
    name: Joi.string().optional(),
    ip: Joi.string().optional().ip({ version: ['ipv4']}),
});

