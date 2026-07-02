const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    coverImage: {
        type: String,
        default: ""
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

}, {
    timestamps: true
});

module.exports = mongoose.model("Blog", blogSchema);