const cron = require('node-cron');
const Habit = require('../models/habitModel');
const Week = require('../models/habitWeekModel');
const { startOfWeekMonday, endOfWeekSunday, buildWeekDaysArray } = require('../utils/date');

/**
 * Schedule:
 * '1 0 * * 1' -> At 00:01 on Monday.
 * Note: this uses the server's local timezone. If you deploy to a server in a different TZ,
 * adjust accordingly or use a more robust scheduler.
 */

function start() {
  // schedule the job
  cron.schedule('1 0 * * 1', async () => {
    console.log('[cron] Creating weekly documents for all habits at', new Date());
    try {
      const habits = await Habit.find().lean();
      const start = startOfWeekMonday(new Date());
      const end = endOfWeekSunday(start);

      for (const habit of habits) {
        // ensure unique creation with upsert-like check
        const exists = await Week.findOne({ habitId: habit._id, startDate: start });
        if (exists) continue;

        const days = buildWeekDaysArray(start);
        const week = new Week({
          habitId: habit._id,
          startDate: start,
          endDate: end,
          days
        });

        await week.save();

        // push to habit.weeks
        await Habit.findByIdAndUpdate(habit._id, { $push: { weeks: week._id } });
      }

      console.log('[cron] Weekly creation finished.');
    } catch (err) {
      console.error('[cron] Error creating weekly documents:', err);
    }
  }, {
    scheduled: true
  });

  console.log('[cron] Weekly creator scheduled (Mon 00:01 server local time).');
}

module.exports = { start };
