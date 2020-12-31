const mongoose = require('../db');
const schema = new mongoose.Schema({
    firstName: {
        desc: "user firstname",
        trim: true,
        type: String,
        required: true,
    },
    lastName: {
        desc: "user lastname",
        trim: true,
        type: String,
        required: true,
    },
    phoneNumber: {
        desc: "Driver phone number",
        trim: true,
        type: String,
        required: true,
        unique: true,
    },
    password: {
        desc: "Driver password",
        trim: true,
        type: String,
        required: true,
        select: false
    },


    email: {
        desc: "Driver email",
        trim: true,
        type: String,
        required: true,
    },
    userType: {
        desc: "user roles", // user,driver,admin
        trim: true,
        type: String,
        required: true,
    },
    finishedRides: {
        desc: "Driver finished rides",
        trim: true,
        type: String,
    },
    rating: {
        desc: "Driver rating max 5",
        trim: true,
        type: String,
        required: true,
    },


    isActive: {
        desc: "is Active",
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
    profit: {
        desc: "Driver total profit",
        trim: true,
        type: String,
        required: true,
    },
},
{
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
}

);

module.exports = mongoose.model("Drivers", schema);