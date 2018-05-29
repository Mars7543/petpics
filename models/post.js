const mongoose = require('mongoose');

module.exports = mongoose.model('Post', new mongoose.Schema({
    description: String,

    image: String,

    tags: [String],

    likes: {
        type: Number,
        default: 0
    },

    liked_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    posted: {
        type: Date,
        default: Date.now()
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}));
