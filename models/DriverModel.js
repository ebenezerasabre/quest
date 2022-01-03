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


    rideType: {
        desc: "Type of ride", // van, long vehicle, truck 
        trim: true,
        type: String,
        required: true,
    },
    carDescription: {
        desc: "Car description",
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
    credit: { // what driver owes the company
        desc: "Driver total profit",
        trim: true,
        type: String,
        required: true,
    },


    isActive: {  // true if active, false if blocked
        desc: "is Active",
        trim: true,
        type: String,
    },
    companyName: {
        desc: "company name",
        trim: true,
        type: String,
    },
    companyId: {
        desc: "company id",
        trim: true,
        type: String,
    },
    referalLink: { 
        // first and last 2 letters of firstname and lastname
        // plus length of your firstname plus lastname
        desc: "referal link",
        trim: true,
        type: String,
        required: true,
    },


    referedlLink: { 
        desc: "referal link",
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

module.exports = mongoose.model("Drivers", schema);