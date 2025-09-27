const mongoose = require('mongoose');


const dailyScoreSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    }
});

const habitScoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    weekScore: {
        type: Number,
        default: 0,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    dailyScore: {
        type: [dailyScoreSchema],
        default: [],
    }
}, { timestamps: true });
module.exports = mongoose.model('habitScore', habitScoreSchema);