// cron/dailyHabitScheduler.js
const schedule = require("node-schedule");
const moment = require("moment-timezone");
const habitModel = require("../models/habitModel");
const dailyHabitModel = require("../models/dailyHabitModel");
const userModel = require("../models/userModel");

async function createDailyHabits() {
  try {
    const users = await userModel.find({});

    for (const user of users) {
      const today = moment().tz(user.timezone).format("YYYY-MM-DD");

      const exists = await dailyHabitModel.findOne({ user: user._id, date: today });
      if (exists) continue;

      const habits = await habitModel.find({ user: user._id });

      if (habits.length > 0) {
        const dailyHabits = habits.map(h => ({
          habit: h._id,
          user: user._id,
          date: today,
          done: false
        }));

        await dailyHabitModel.insertMany(dailyHabits);
        console.log(`✅ Daily habits created for ${user.email} on ${today}`);
      }
    }
  } catch (err) {
    console.error("❌ Error creating daily habits:", err);
  }
}

function scheduleDailyHabits() {
  // Runs every day at 00:00 UTC
  schedule.scheduleJob("0 0 * * *", createDailyHabits);
}

module.exports = scheduleDailyHabits;
