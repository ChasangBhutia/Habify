const mongoose = require('mongoose');

const habitScoreSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    score: {
        type: Number,
        default: 0,
    },
    title:{
        type:Number,
        default:0
    },
    date: {
        type: String
    },
    backgroundColor: {
        type:String,
        default: '#033718ff'
    }
});

module.exports = mongoose.model('habitScore', habitScoreSchema);