const mongoose = require('../db');
const schema = new mongoose.Schema({
    driverId: {
        desc: "Driver id",
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
    msg: {
        desc: "Review message",
        trim: true,
        type: String,
        default: "",
    },
    stars: {
        desc: "Rating stars",
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
module.exports = mongoose.model("Reviews", schema);