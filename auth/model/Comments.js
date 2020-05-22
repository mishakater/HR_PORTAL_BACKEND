const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    commentText: {
        type: String,
        required: true,
        max: 1000000
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comments', commentsSchema);