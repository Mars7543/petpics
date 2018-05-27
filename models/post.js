const mongoose = require('mongoose');

module.exports = mongoose.model('Post', new mongoose.Schema({
    description: String,

    image: String,

    tags: [String],

    likes: {
        type: Number,
        default: 0
    },

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
