const mongoose = require('mongoose');

module.exports = mongoose.model('Post', new mongoose.Schema({
    description:        String,
    image:              String,
    likes: Number,
    
    user_id: {
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
