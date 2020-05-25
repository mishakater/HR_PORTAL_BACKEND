const mongoose = require('mongoose');

const feedbacksSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    from: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedbacks', feedbacksSchema);
