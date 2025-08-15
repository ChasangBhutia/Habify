// cron/dailyHabitScheduler.js
const schedule = require("node-schedule");
const habitModel = require("../models/habitModel");
const dailyHabitModel = require("../models/dailyHabitModel");
const userModel = require("../models/userModel");

async function scheduleDailyHabits() {
  const users = await userModel.find({});

  users.forEach(user => {
    const rule = new schedule.RecurrenceRule();
    rule.hour = 23;
    rule.minute = 56;
    rule.tz = user.timezone;

    schedule.scheduleJob(rule, async () => {
      try {
        const today = new Date().toLocaleDateString("en-CA", { timeZone: user.timezone }); // YYYY-MM-DD

        const exists = await dailyHabitModel.findOne({ user: user._id, date: today });
        if (exists) return;

        const habits = await habitModel.find({ user: user._id });

        const dailyHabits = habits.map(h => ({
          habit: h._id,
          user: user._id,
          date: today,
          done: false
        }));

        await dailyHabitModel.insertMany(dailyHabits);
        console.log(`Daily habits created for ${user.email} on ${today}`);
      } catch (err) {
        console.error("Error creating daily habits:", err);
      }
    });
  });
}

module.exports = scheduleDailyHabits;
