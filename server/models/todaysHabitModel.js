const mongoose = require('mongoose');

const todaysHabitSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'habit',
        required: true
    },
    done:{
        type:Boolean,
        default:false,
    },
    date: { type: Date, required: true },
});


module.exports = mongoose.model('todaysHabit', todaysHabitSchema);
    