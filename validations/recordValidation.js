const Joi = require('joi')
    .extend(require('@joi/date'));

// validations 
const registerValidation = (requestBody) => {
    const recordsRequestSchema = Joi.object({
        startDate: Joi.date().format('YYYY-MM-DD').required(),
        endDate: Joi.date().format('YYYY-MM-DD').required(),
        minCount: Joi.number().required(),
        maxCount: Joi.number().required()
    });
    
    return recordsRequestSchema.validate(requestBody);
};

module.exports.registerValidation = registerValidation;