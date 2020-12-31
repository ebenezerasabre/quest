const express = require('express');
const historyRouter = express.Router();
const HistoryController = require('../controllers/HistoryController');

historyRouter.get('/', HistoryController.findAllHistory);
historyRouter.get('/count', HistoryController.countHistory);
historyRouter.get('/user/:id', HistoryController.findUserHistory);
historyRouter.get('/:id', HistoryController.findHistoryById);

historyRouter.post('/', HistoryController.createHistory);
historyRouter.put('/:id', HistoryController.updateHistory);
historyRouter.delete('/:id', HistoryController.deleteHistory);
historyRouter.delete('/', HistoryController.deleteAllHistory);

module.exports = historyRouter;