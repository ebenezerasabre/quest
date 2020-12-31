const mongoose = require('../db');
const schema = new mongoose.Schema({
    riderequestId: {
        desc: "Request id",
        trim: true,
        type: String,
        required: true,
        unique: true,
    },
    driverId: {
        desc: "Driver id",
        trim: true,
        type: String,
        required: true,
    },
    driverName: {
        desc: "Name of driver",
        trim: true,
        type: String,
        required: true,
    },
    driverPoint: {
        desc: "Driver current point of location",
        trim: true,
        type: String,
        required: true,
    },

    carDescription: {
        desc: "Driver car description",
        trim: true,
        type: String,
        required: true,
    },
    carNumber: {
        desc: "Driver car number",
        trim: true,
        type: String,
        required: true,
    },
    finishedRides: {
        desc: "Driver finished rides",
        trim: true,
        type: String,
    },
    driverRating: {
        desc: "Driver rating max 5",
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
    userName: {
        desc: "Name of user",
        trim: true,
        type: String,
        required: true,
    },
    userPhoneNumber: {
        desc: "Phone number of user",
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
    status: {
        desc: "History status", //picking / started / finished
        trim: true,
        type: String,
        required: true,
    },
    fee: {
        desc: "Cost of ride",
        trim: true,
        type: String,
        required: true,
    },
},
{
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});
module.exports = mongoose.model("Accepts", schema);