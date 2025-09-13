const mongoose = require('mongoose');

const subTaskSchema = mongoose.Schema({
    title: String,
    progress: {
        type: String,
        enum: ['done', 'not done', 'in progress']
    },
    done: {
        type:Boolean,
        default:false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});


module.exports = mongoose.model('subTask', subTaskSchema);