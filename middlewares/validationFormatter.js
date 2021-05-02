const {validationResult} = require('express-validator');

module.exports = (req, res, next) => {
  let errors = validationResult(req).array();
  errors = errors.map(err => {
    return {message: err.msg, param: err.param};
  });

  if (errors.length)
    return res.status(422).json({code: 2, msg: 'Validation error - Invalid request parameters.', details: errors});

  next();
};