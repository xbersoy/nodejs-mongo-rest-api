const {check} = require('express-validator');
const formatter = require('../middlewares/validationFormatter');

exports.recordParameterValidation = [
  checkStartDate(),
  checkEndDate(),
  checkMinCount(),
  checkMaxCount(),
  formatter,
];

function checkStartDate() {
    return check('startDate')
      .custom((value, {req}) => {
        if (req.body.startDate === undefined) return true;
        const valid = isDateValid(req.body.startDate);
        return valid
      })
      .withMessage('startDate must be a valid date')
      .bail()

      .custom((value, {req}) => {
        if (new Date(req.body.startDate) < new Date(req.body.endDate)) return true;
      })
      .withMessage('startDate should be less than endDate')
      .bail();
    }
    
    function checkEndDate() {
      return check('endDate')
      .custom((value, {req})=> {
        if (req.body.endDate === undefined) return true;
        const isValid = isDateValid(req.body.endDate);
        return isValid
      })
      .withMessage('endDate must be a valid date')
      .bail();
  }

function checkMinCount() {
  return check('minCount')
    .exists()
    .withMessage('minCount parameter should be present')
    .bail()

    .not()
    .isEmpty()
    .withMessage('minCount can not be empty!')
    .bail()

    .not()
    .isString()
    .withMessage('minCount should be a number, not a string')
    .bail()

    .custom((value, {req}) => {
        if (req.body.minCount < req.body.maxCount) return true;
      })
    .withMessage('minCount should be greater than maxCount')
    .bail()

    .isNumeric({min: 0})
    .withMessage('minCount should be a number')
    .bail();
}

function checkMaxCount() {
  return check('maxCount')
    .exists()
    .withMessage('maxCount parameter should be present')
    .bail()

    .not()
    .isEmpty()
    .withMessage('maxCount can not be empty!')
    .bail()

    .not()
    .isString()
    .withMessage('maxCount should be a number, not a string')
    .bail()

    .custom((value, {req}) => {
        if (req.body.minCount < req.body.maxCount) return true;
      })
    .withMessage('maxCount should be greater than minCount')
    .bail()

    .isNumeric({min: 0})
    .withMessage('maxCount should be a number')
    .bail();
}

function isDateValid(...val) {
  return !Number.isNaN(new Date(...val).valueOf());
}