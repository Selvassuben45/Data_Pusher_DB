const express = require('express');
const router = express.Router();
const controller = require('../controllers/accountcontroller');

router.post('/', controller.createAccount);
router.get('/', controller.getAccounts);
router.get('/:id', controller.getAccount);
router.put('/:id', controller.updateAccount);
router.delete('/:id', controller.deleteAccount);

module.exports = router;
