const mongoose = require('mongoose');

const habitSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    name: String,
})

module.exports = mongoose.model('habit', habitSchema);