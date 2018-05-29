const mongoose = require('mongoose');

module.exports = mongoose.model('Post', new mongoose.Schema({
    description: String,

    image: String,

    tags: [String],

    liked_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    posted: {
        type: String,
        default: new Date().toISOString()
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}));
