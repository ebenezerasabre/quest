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
        desc: "user phone number",
        trim: true,
        type: String,
        required: true,
        unique: true,
    },
    password: {
        desc: "user password",
        trim: true,
        type: String,
        required: true,
        select: false
    },


    email: {
        desc: "user email",
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
        desc: "user finished rides",
        trim: true,
        type: Number,
    },
    rating: {
        desc: "user rating max 5",
        trim: true,
        type: String,
        required: true,
    },

    homeLocation: {
        desc: "user work location",
        trim: true,
        type: String,
    },
    workLocation: {
        desc: "user work location",
        trim: true,
        type: String,
    },
    isActive: {
        desc: "is Active",
        trim: true,
        type: String,
        required: true,
        
    }
},
{
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
}
);

module.exports = mongoose.model("Users", schema);