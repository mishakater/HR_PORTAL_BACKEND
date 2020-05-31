const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    companyName: {
        type: String,
        required: false,
        max: 255
    },
    jobPosition: {
        type: String,
        required: false,
        max: 255
    },
    workExperience: {
        type: String,
        required: false,
        max: 255
    },
    salary: {
        type: Number,
        required: false,
    },
    phone: {
        type: Number,
        required: false,
        max: 5000000000000
    },
    rating:{
        type: Number,
        required: false,
        max: 10
    },
    facebookLink: {
        type: String,
        required: false,
        max: 255
    },
    linkedinLink: {
        type: String,
        required: false,
        max: 255
    },
    githubLink: {
        type: String,
        required: false,
        max: 255
    },
    telegramLink: {
        type: String,
        required: false,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', profileSchema);
