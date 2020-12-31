const express = require('express');
const aboutRouter = express.Router();
const AboutController = require('../controllers/AboutController');

aboutRouter.get('/', AboutController.findAllAbouts);
aboutRouter.get('/count', AboutController.coutAbout);
aboutRouter.get('/:id', AboutController.findAboutById);
aboutRouter.post('/', AboutController.createAbout);

aboutRouter.put('/:id', AboutController.updateAbout);
aboutRouter.delete('/:id', AboutController.deleteAbout);
aboutRouter.delete('/', AboutController.deleteAllAbouts);

module.exports = aboutRouter;