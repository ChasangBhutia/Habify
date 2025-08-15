const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    image: String,
    
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
    }],
    toDos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'toDo'
    }],
    timezone: { type: String, default: "UTC" }
});

module.exports = mongoose.model('user', userSchema);