const RideRequestModel = require('../models/RideRequestModel');


/**
 * TODO FIND
 */

 exports.findAllRideRequests = (req, res) => {
    RideRequestModel.find()
    .then((rides) => {
        if(rides){
            return res.status(200).send(rides);
        }
        return res.status(404).send({message: "RideRequests not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });

 };

 exports.findRideRequestById = (req, res) => {
     RideRequestModel.findById(req.params.id)
     .then((ride) => {
         if(ride){
             return res.status(200).send(ride);
         }
         return res.status(404).send({message: "Ride not found"});
     })
     .catch((err) => {
         return res.status(500).send({message: err.message});
     });
 };

 exports.findUserRideRequests = (req, res) => {
     RideRequestModel.find( { userId: { $eq : req.params.id } })
     .then((rides) => {
         if(rides){
             return res.status(200).send(rides);
         }
         return res.status(404).send({message: "RideRequests not found"});
     })
     .catch((err) => {
         return res.status(500).send({message: err.message});
     });
 };

 exports.findDriverRideRequests = (req, res) => {
    RideRequestModel.find( { driverId: { $eq : req.params.id } })
    .then((rides) => {
        if(rides){
            return res.status(200).send(rides);
        }
        return res.status(404).send({message: "RideRequests not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
};

 /**
 * TODO COUNT
 */

 exports.coundRideRequests = (req, res) => {
     RideRequestModel.find()
     .countDocuments()
     .then((total) => {
         if(total){
             return res.status(200).send({message: total});
         }
         return res.status(404).send({message: "Couldn't count ride requuests"});
     })
     .catch((err) => {
         return res.status(500).send({message: err.message});
     });
 };

 /**
 * TODO CREATE
 */

 exports.createRideRequests = (req, res) => {
    if(!req.body.userId || !req.body.driverId){
        return res.status(400)
        .send({message: "Required field can't be empty"});
    }
    // create
    const RideRequest = new RideRequestModel({

        userName: req.body.userName,
        userId: req.body.userId,
        userType: req.body.userType,
        phoneNumber: req.body.phoneNumber,
        socketId: req.body.socketId,
        entryPoint: req.body.entryPoint,

        exitPoint: req.body.exitPoint,
        lat: req.body.lat,
        lng: req.body.lng,
        city: req.body.city,
        rideType: req.body.rideType,

        proximityDriver: req.body.proximityDriver,
        driverId: req.body.driverId,
        dSocketId: req.body.dSocketId,
        dLat: req.body.dLat,
        dLng: req.body.dLng,

        dArrivalTime: req.body.dArrivalTime,
        dName: req.body.dName,
        dRideDescription: req.body.dRideDescription,
        dRideNumber: req.body.dRideNumber,
        dFinishedRides: req.body.dFinishedRides,

        driverReject: req.body.driverReject,
        rideState: req.body.rideState,
        fee: req.body.fee

    });

    // save
    RideRequest.save()
    .then((ride) => {
        if(ride){
            return res.status(200).send(ride);
        }
        return res.status(404).send({message: "Couldn't create ride request"});
    }).catch((err) => {
        return res.status(500).send({message: err.message});
    });


 };;

 exports.createRideRequestsInside = (body) => {
    if(!body.userId || !body.driverId){
        console.log("Required field can't be empty");
    }
    // create
    const RideRequest = new RideRequestModel({

        userName: body.userName,
        userId: body.userId,
        userType: body.userType,
        phoneNumber: body.phoneNumber,
        socketId: body.socketId,
        entryPoint: body.entryPoint,

        exitPoint: body.exitPoint,
        lat: body.lat,
        lng: body.lng,
        city: body.city,
        rideType: body.rideType,

        proximityDriver: body.proximityDriver,
        driverId: body.driverId,
        dSocketId: body.dSocketId,
        dLat: body.dLat,
        dLng: body.dLng,

        dArrivalTime: body.dArrivalTime,
        dName: body.dName,
        dRideDescription: body.dRideDescription,
        dRideNumber: body.dRideNumber,
        dFinishedRides: body.dFinishedRides,

        driverReject: body.driverReject,
        rideState: body.rideState,
        fee: body.fee

    });

    // save
    RideRequest.save()
    .then((ride) => {
        if(ride){
            console.log(ride);
            return;
        }
        return;
    }).catch((err) => {
        console.log(err.message);
        return;
    });

};

 /**
 * TODO UPDATE
 */

 exports.updateRideRequest = (req, res) => {
    if(!req.params.id){
        return res.status(400).send({message: "Required field can't be empty"});
    }
    RideRequestModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((ride) => {
        if(ride){
            return res.status(200).send(ride);
        }
        return res.status(404).send({message: "Couldn't update ride request"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
 };

//  body.createdAt

 exports.updateRideRequestInside = (body) => {
    RideRequestModel.find( { createdAt: {$eq: body.createdAt}  } )
    .then((ride) => {
        if(ride){
            RideRequestModel.findOneAndUpdate(body.id, body, {new: true})
            .then((update) => {
                if(update){
                    console.log(update);
                    return;
                }
                return;
            })
            .catch((err) => {
                console.log(err.message);
                return;
            });
        }
        return;
    })
    .catch((err) => {
         console.log(err.message);
         return;
    });
};

 /**
 * TODO DELETE
 */

 exports.deleteRideRequest = (req, res) => {
     RideRequestModel.findByIdAndRemove(req.params.id)
     .then((ride) => {
         if(ride){
             return res.status(200).send({message: "Deleted successfully"});
         }
         return res.status(404).send({message: "Ride request not found"});
     })
     .catch((err) => {
         return res.status(500).send({message: err.message});
     });
 };

 exports.deleteAllRideRequests = (req, res) => {
     RideRequestModel
     .find()
     .remove()
     .then(() => {
         return res.status(200).send({message: "Deleted all ride request records"});
     })
     .catch((err) => {
         return res.status(500).send({message: err.message});
     });
 };




