const RecordModel = require('../models/record');

module.exports.getRecords = async (oRequestBody) => {
  const { startDate, endDate, minCount, maxCount } = oRequestBody;

  // firstly, match phase applied in order to reduce data will be passed next stage
  // then a new projection created with a new field called totalCount which refers to summary of values in counts array 
  // at the end of the aggr pipeline, data filtered with conditions with provided values (minCount, maxCount)
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