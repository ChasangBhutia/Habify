const cron = require('node-cron');
const moment = require('moment-timezone');
const todayHabitModel = require('../models/todaysHabitModel');
const habitModel = require('../models/habitModel');
const userModel = require('../models/userModel');

function createDailyHabit() {
  // Run every hour
  cron.schedule('0 * * * *', async () => {
    try {
      console.log("Running hourly daily habit check at", new Date());

      const users = await userModel.find({}, { _id: 1, timezone: 1 }).lean();

      for (const user of users) {
        const tz = user.timezone || 'UTC';
        const userLocalTime = moment().tz(tz);
        const localHour = userLocalTime.hour();
        const localMinute = userLocalTime.minute();

        // Run only when it's 12:01 AM for that user
        if (localHour === 0 && localMinute === 1) {
          console.log(`Creating daily habits for user ${user._id} (${tz}) at local time ${userLocalTime.format('HH:mm')}`);

          // Delete today's habits
          await todayHabitModel.deleteMany({ userId: user._id });

          // Get all user habits
          const habits = await habitModel.find({ userId: user._id });
          if (!habits.length) continue;

          // Recreate today's habits
          const todayHabits = habits.map(habit => ({
            userId: habit.userId,
            habitId: habit._id,
            done: false,
            date: new Date(new Date().setHours(0, 0, 0, 0))
          }));

          await todayHabitModel.insertMany(todayHabits);
          console.log(`✅ Daily habits reset for user ${user._id}`);
        }
      }
    } catch (err) {
      console.error(`Error creating daily habits: ${err.message}`);
    }
  }, { scheduled: true });
}

module.exports = { createDailyHabit };
