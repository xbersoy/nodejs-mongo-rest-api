const {GeneralError, NotFound} = require('../util/errorTypes');

module.exports.async = (req, res, next, promise) => {
  promise
    .then(responseData => {
      res.status(200).json({
        code: 0,
        msg: "Success",
        records: responseData
      });
    })
    .catch(err => {
      if (err instanceof GeneralError) {
        return res.status(err.getStatusCode()).json({
          code: 1,
          msg: err.message
        });
      }

      return res.status(500).json({
        code: 1,
        msg: err.message
      });
    });
};

module.exports.nonAsync = (req, res, next, fn) => {
  try {
    const data = fn(req);
    res.status(200).json({
      code: 0,
      msg: "Success",
      records: data
    });
  } catch (err) {
    if (err instanceof GeneralError) {
      return res.status(err.getStatusCode()).json({
        code: 1,
        msg: err.message
      });
    }
    if (err instanceof NotFound) {
      return res.status(err.getStatusCode()).json({
        code: 3,
        msg: err.message
      });
    }

    return res.status(500).json({
      code: 1,
      msg: err.message
    });
  }
};