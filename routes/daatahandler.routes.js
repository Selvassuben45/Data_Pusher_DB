const express = require('express');
const router = express.Router();
const controller = require('../controllers/datahandler.controller');

// Only POST method supported for incoming_data
router.post('/', controller.receiveData);

module.exports = router;
