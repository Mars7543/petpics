const mongoose = require('mongoose');

module.exports = mongoose.model('Comment', new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    comment: String,

    posted: {
        type: Date,
        default: Date.now()
    },
}));
