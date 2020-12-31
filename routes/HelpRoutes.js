const express = require('express');
const helpRouter = express.Router();
const HelpController = require('../controllers/HelpController');


helpRouter.get('/', HelpController.findAllHelps);
helpRouter.get('/count', HelpController.countHelps);
helpRouter.get('/:id', HelpController.findHelpById);
helpRouter.post('/', HelpController.createHelp);

helpRouter.put('/:id', HelpController.updateHelp);
helpRouter.delete('/:id', HelpController.deleteHelp);
helpRouter.delete('/', HelpController.deleteAllHelp);

module.exports = helpRouter;