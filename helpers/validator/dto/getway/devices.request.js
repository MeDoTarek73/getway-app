
const Joi = require('joi');
module.exports = Joi.object({
    devices: Joi.array().items(Joi.string()).min(1).max(10).unique().optional().messages({
        'array.unique': 'Duplicate device id found',
        'array.max': 'Maximum 10 devices allowed',
        'array.min': 'Minimum 1 device required',
    }),
});