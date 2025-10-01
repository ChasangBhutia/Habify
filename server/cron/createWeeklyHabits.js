const cron = require('node-cron');
const moment = require('moment-timezone');
const userModel = require('../models/userModel');
const habitScoreModel = require('../models/habitScoreModel');
const habitModel = require('../models/habitModel');
const habitWeekModel = require('../models/habitWeekModel');
const { startOfWeekMonday, endOfWeekSunday, buildWeekDaysHabit, buildWeekDaysScore } = require('../utils/date');

function createWeeklyHabit() {
  // Run every 10 minutes
  cron.schedule('*/10 * * * *', async () => {
    console.log("⏰ Checking which users reached Monday 12:01 AM in their timezone…", new Date());

    try {
      const users = await userModel.find({}).lean();

      for (const user of users) {
        const tz = user.timezone || 'UTC';
        const nowLocal = moment.tz(tz);

        
        if (nowLocal.day() === 1 && nowLocal.hour() === 0 && nowLocal.minute() < 10) {
          console.log(`🌍 Creating weekly habits for user ${user._id} (${tz})`);

          const startDate = startOfWeekMonday(nowLocal.toDate());
          const endDate = endOfWeekSunday(startDate);

          const existingScore = await habitScoreModel.findOne({ userId: user._id, startDate, endDate });
          if (!existingScore) {
            await habitScoreModel.create({
              userId: user._id,
              startDate,
              endDate,
              weekScore: 0,
              dailyScore: buildWeekDaysScore(startDate),
            });
            console.log(`✅ Created weekly score for ${user._id}`);
          }

          const habits = await habitModel.find({ userId: user._id }).lean();
          for (const habit of habits) {
            const exists = await habitWeekModel.findOne({ userId: user._id, habitId: habit._id, startDate, endDate });
            if (!exists) {
              await habitWeekModel.create({
                userId: user._id,
                habitId: habit._id,
                startDate,
                endDate,
                days: buildWeekDaysHabit(startDate),
              });
              console.log(`✅ Created weekly habit for ${user._id} (${habit._id})`);
            }
          }
        }
      }
    } catch (err) {
      console.error(`❌ Error creating weekly habits: ${err.message}`);
    }
  });
}

module.exports = { createWeeklyHabit };
