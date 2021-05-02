const recordService = require('../services/records');

exports.getRecords = async (req) => {    
    const { startDate, endDate, minCount, maxCount } = req.body;
    const records = await recordService.getRecords({startDate, endDate, minCount, maxCount});
    
    return records;
};