const mongoose = require('../db');
const schema = new mongoose.Schema({
    title: {
        desc: "The title of about message",
        trim: true,
        type: String,
        required: true,
    },
    msg: {
        desc: "About message content",
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

module.exports = mongoose.model("Abouts", schema);