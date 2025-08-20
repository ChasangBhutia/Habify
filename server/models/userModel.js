const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dzjspl6ws/image/upload/v1754150232/defaultUserProfilePic_lx62o9.jpg'
    },
    collabTasks: [{
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

// const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;