const router = require('express').Router();
const recordController = require('../controllers/records');
const responseManager = require('../middlewares/responseManager');

router.post(
  '/',
  async (req, res, next) => {
    responseManager.async(req, res, next, recordController.getRecords(req));
  },
);

module.exports = router;