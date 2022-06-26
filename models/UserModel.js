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
        trim: true ,
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

  
    isActive: { // true if active, false if blocked
        desc: "is Active",
        trim: true,
        type: String,
    },
    referalLink: { 
        // first and last 2 letters of firstname and lastname
        // plus length of your firstname plus lastname
        desc: "referal link",
        trim: true,
        type: String,
    },
    referedlLink: { 
        desc: "referal link",
        trim: true,
        type: String,
    },
    discount: { 
        desc: "Discount to user",
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

module.exports = mongoose.model("Users", schema);