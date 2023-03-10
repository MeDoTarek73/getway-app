const Joi = require('joi');
module.exports = Joi.object({
    vendor: Joi.string().required(),
    status: Joi.string().optional().valid("online", "offline").default("offline"),
});