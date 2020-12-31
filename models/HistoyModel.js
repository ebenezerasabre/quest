const mongoose = require('../db');
const schema = new mongoose.Schema({
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
    userId: {
        desc: "User id of user",
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
        desc: "History status", // finished by default
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

module.exports = mongoose.model("History", schema);