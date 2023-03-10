const Joi = require('joi');
module.exports = Joi.object({
    vendor: Joi.string().optional(),
    status: Joi.string().valid("online", "offline").optional(),
});