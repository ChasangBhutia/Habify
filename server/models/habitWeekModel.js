const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
    date: { type: Date, required: true },
    score: { type: Number, default: 0 }, // you can change to { type: Number, min:0, max:100 } if needed
    done: { type: Boolean, default: false },
     // "YYYY-MM-DD" format for easier comparison
}, { _id: false });

const weekSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'habit', required: true },
    startDate: { type: Date, required: true }, // Monday 00:00:00
    endDate: { type: Date, required: true },   // Sunday 23:59:59 (we store just date)
    days: { type: [daySchema], default: [] },
    createdAt: { type: Date, default: Date.now },
    weekHabitscore: { type: Number, default: 0 },
});

weekSchema.index({ habitId: 1, startDate: 1 }, { unique: true });

module.exports = mongoose.model('week', weekSchema);
