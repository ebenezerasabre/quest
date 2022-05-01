const mongoose = require('../db');
const schema = new mongoose.Schema({
    customerId: {
        desc: "customers unique ID",
        trim: true,
        type: String,
        required: true,
    },
    carType: {
        desc: "The car customer wants to book",
        trim: true,
        type: String,
        required: true,
    },
    date: {
        desc: "when customer wants to book a ride",
        trim: true,
        type: String,
        required: true,
    },
    time: {
        desc: "The time to pick up",
        trim: true,
        type: String,
        required: true,
    },
    pickUp: {
        desc: "Customer pcikup point",
        trim: true,
        type: String,
        required: true,
    },

    
    dropOff: {
        desc: "Customer's destination",
        trim: true,
        type: String,
        required: true,
    },
    bookUpdate: {
        desc: "booking state",
        trim: true,
        type: String,
    },
    driverId: {
        desc: "Drivers id",
        trim: true,
        type: String,
    },
    driverName: {
        desc: "Driver name",
        trim: true,
        type: String,
    },

},
{
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
}
);

module.exports = mongoose.model("Booking", schema);