const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: true,
        max: 1000
    },
    header: {
        type: String,
        required: true,
        max: 2000
    },
    shortDescription: {
        type: String,
        required: true,
        max: 7000
    },
    text: {
        type: String,
        required: false,
        max: 1000000
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('News', newsSchema);