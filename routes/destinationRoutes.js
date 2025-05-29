const express = require('express');
const router = express.Router();
const controller = require('../controllers/destinationController');

router.post('/', controller.createDestination);
router.get('/', controller.getDestinations);
router.get('/:id', controller.getDestinationsByAccount);
router.put('/:id', controller.updateDestination);
router.delete('/:id', controller.deleteDestination);

module.exports = router;
