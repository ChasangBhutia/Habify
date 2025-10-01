const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Single', 'Group']
    },
    priority: {
        type: String,
        enum: ['High', 'Low', 'Med']
    },
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    subTasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subTask'
    }],
    
});


module.exports = mongoose.model('task', taskSchema);