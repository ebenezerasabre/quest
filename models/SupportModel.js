const mongoose = require('../db');
const schema = mongoose.Schema({
    topic: {
        desc: "Support article title",
        trim: true,
        type: String,
        required: true,
    },
    author: {
        desc: "Author of article",
        trim: true,
        type: String,
        required: true,
    },
    msg: {
        desc: "Support article message",
        trim: true,
        type: String,
        required: true,
    }
},
{
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt"},
});
module.exports = mongoose.model("Supports", schema);