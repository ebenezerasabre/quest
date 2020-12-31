const mongoose = require('../db');
const schema = new mongoose.Schema({
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
    phoneNumber: {
        desc: "Number of user",
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
        desc: "History status", // pending,accepted
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
module.exports = mongoose.model("Requests", schema);