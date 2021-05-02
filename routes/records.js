const router = require('express').Router();
const recordController = require('../controllers/records');
const responseManager = require('../middlewares/responseManager');
const recordValidator = require('../validations/recordValidation');
const validationFormatter = require('../middlewares/validationFormatter');

router.post(
  '/',
  recordValidator.recordParameterValidation,
  validationFormatter,
  async (req, res, next) => {
    responseManager.async(req, res, next, recordController.getRecords(req));
  },
);

module.exports = router;