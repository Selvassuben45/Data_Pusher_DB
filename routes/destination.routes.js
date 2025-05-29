const express = require('express');
const router = express.Router();
const controller = require('../controllers/destination.controller');

router.post('/', controller.createDestination);
router.get('/', controller.getDestinations);
router.get('/:id', controller.getDestination);
router.put('/:id', controller.updateDestination);
router.delete('/:id', controller.deleteDestination);

module.exports = router;
