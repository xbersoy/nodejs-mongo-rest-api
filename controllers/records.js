const recordService = require('../services/records')
const { registerValidation } = require('../validations/recordValidation');

exports.getRecords = async (req) => {
    const { validationError } = registerValidation(req.body);

    if (validationError) {
        return validationError.details[0].message;
    }
    
    const { startDate, endDate, minCount, maxCount } = req.body;
    const records = await recordService.getRecords({startDate, endDate, minCount, maxCount});
    
    return records;
};