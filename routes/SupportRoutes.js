const express = require('express');
const supportRouter = express.Router();
const SupportController = require('../controllers/SupportController');


supportRouter.get('/', SupportController.findAllSupports);
supportRouter.get('/count', SupportController.countSupports);
supportRouter.get('/:id', SupportController.findSupportById);
supportRouter.post('/', SupportController.createSupport);

supportRouter.put('/:id', SupportController.updateSupport);
supportRouter.delete('/:id', SupportController.deleteSupport);
supportRouter.delete('/', SupportController.deleteAllSupports);

module.exports = supportRouter;