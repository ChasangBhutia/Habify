const mongoose = require('mongoose');

const taskCommentSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    subTaskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subTask'
    },
    comment:String
})

module.exports = mongoose.model('taskComment', taskCommentSchema);