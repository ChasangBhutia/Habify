const mongoose = require("mongoose");

const taskFileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    subTaskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subTask'
    },
    filename: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    resourceType: String,
    uploadedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('taskFile', taskFileSchema);