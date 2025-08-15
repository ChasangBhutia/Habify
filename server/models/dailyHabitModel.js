const mongoose = require("mongoose");

const dailyHabitSchema = new mongoose.Schema({
  habit: { type: mongoose.Schema.Types.ObjectId, ref: "habit", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  date: { type: String, required: true }, // store as yyyy-mm-dd
  done: { type: Boolean, default: false }
});

module.exports = mongoose.model("dailyHabit", dailyHabitSchema);
