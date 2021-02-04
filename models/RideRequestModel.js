const mongoose = require('../db');
const schema = new mongoose.Schema({
    userName: {
        desc: "Name of user",
        trim: true,
        type: String,
        required: true,
    },
    userId: {
        desc: "User id",
        trim: true,
        type: String,
        required: true,
    },
    userType: {
        desc: "Type of user",
        trim: true,
        type: String,
        required: true,
    },
    phoneNumber: {
        desc: "Number of user",
        trim: true,
        type: String,
        required: true,
    },
    socketId: {
        desc: "socketId of user",
        trim: true,
        type: String,
        required: true,
    },
    entryPoint: {
        desc: "User pick up point",
        trim: true,
        type: String,
        required: true,
    },


    exitPoint: {
        desc: "User destination",
        trim: true,
        type: String,
        required: true,
    },
    lat: {
        desc: "Current lat of user",
        trim: true,
        type: String,
        required: true,
    },
    lng: {
        desc: "Current lng of user",
        trim: true,
        type: String,
        required: true,
    },
    city: {
        desc: "City of transit",
        trim: true,
        type: String,
        required: true,
    },
    rideType: {
        desc: "Form of transit",
        trim: true,
        type: String,
        required: true,
    },
 
    // driver details
    proximityDriver: {
        desc: "Closest driver", // pending,accepted
        trim: true,
        type: String,
    },
    driverId: {
        desc: "driver id", // pending,accepted
        trim: true,
        type: String,
    },
    dsocketId: {
        desc: "driver socketId", 
        trim: true,
        type: String,
    },
    dLat: {
        desc: "driver lat", 
        trim: true,
        type: String,
    },
    dLng: {
        desc: "driver lng",
        trim: true,
        type: String,
    },


    dArrivalTime: {
        desc: "Time driver arrives",
        trim: true,
        type: String,
    },
    dName: {
        desc: "Name of driver", 
        trim: true,
        type: String,
    },
    dRideDescription: {
        desc: "Ride description", 
        trim: true,
        type: String,
    },
    dRideNumber: {
        desc: "Closest driver", 
        trim: true,
        type: String,
    },
    dFinishedRides: {
        desc: "Driver completed rides",
        trim: true,
        type: String,
    },


    driverReject: {
        desc: "Drivers who have rejected request",
        trim: true,
        type: String,
    },
    rideState: {
        desc: "State of ride",
        trim: true,
        type: String,
    },
    fee: {
        desc: "Cost of ride",
        trim: true,
        type: String,
    },
},
{
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});
module.exports = mongoose.model("Requests", schema);