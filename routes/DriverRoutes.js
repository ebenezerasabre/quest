const express = require('express');
const driverRouter = express.Router();
const DriverController = require('../controllers/DriverController');


driverRouter.get('/', DriverController.findAllDrivers);
driverRouter.get('/count', DriverController.countDrivers);
driverRouter.get('/:id', DriverController.findDriverById);
driverRouter.post('/', DriverController.createDriver);

driverRouter.put('/:id', DriverController.updateDriver);
driverRouter.delete('/:id', DriverController.deleteDriver);
driverRouter.delete('/', DriverController.deleteAllDrivers);

module.exports = driverRouter;