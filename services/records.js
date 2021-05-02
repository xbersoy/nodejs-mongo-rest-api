const RecordModel = require('../models/record');

module.exports.getRecords = async (oRequestBody) => {
  const { startDate, endDate, minCount, maxCount } = oRequestBody;

  const dbResult = await RecordModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      }
    }, 
    {
      $project: {
        _id: false,
        key: '$key',
        createdAt: '$createdAt',
        totalCount: { $sum: '$counts' },
      }
    },
    {
      $match: {
        totalCount: {
          $gte: minCount,
          $lte: maxCount,
        },
      }
    }
  ]);

  return dbResult;
};