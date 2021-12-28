const expreess = require('express');
const rideRequestRouter = expreess.Router();
const RideRequestController = require('../controllers/RideRequestController');

rideRequestRouter.get('/', RideRequestController.findAllRideRequests);
rideRequestRouter.get('/count', RideRequestController.coundRideRequests);
rideRequestRouter.get('/user/:id', RideRequestController.findUserRideRequests);
rideRequestRouter.get('/driver/:id', RideRequestController.findDriverRideRequests);
// rideRequestRouter.get('/', RideRequestController.findAllRideRequests);
// rideRequestRouter.get('/', RideRequestController.findAllRideRequests);


rideRequestRouter.post('/', RideRequestController.createRideRequests);
rideRequestRouter.put('/:id', RideRequestController.updateRideRequest);
rideRequestRouter.delete('/:id', RideRequestController.deleteRideRequest);
rideRequestRouter.delete('/', RideRequestController.deleteAllRideRequests);

module.exports = rideRequestRouter;