const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
        max: 255
    },
    company: {
        type: String,
        required: true,
        max: 255
    },
    description: {
        type: String,
        required: true,
        max: 2000
    },
    salary: {
        type: Number,
        required: false,
        max: 1000000
    },
    category: {
        type: String,
        required: true,
        max: 255
    },
    employment:{
        type: String,
        required: true,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vacancy', vacancySchema);