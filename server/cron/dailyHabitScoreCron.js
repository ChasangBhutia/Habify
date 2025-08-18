// cron/dailyHabitScheduler.js
const schedule = require("node-schedule");
const userModel = require("../models/userModel");
const habitScoreModel = require("../models/habitScoreModel");

function scheduleDailyHabitScore() {
    
    schedule.scheduleJob("0 0 * * *", async () => {
        try {
            const users = await userModel.find({});
            for (const user of users) {
                const today = new Date().toLocaleDateString("en-CA", {
                    timeZone: user.timezone
                });

                const exists = await habitScoreModel.findOne({
                    userId: user._id,
                    date: today
                });

                if (!exists) {
                    await habitScoreModel.create({
                        userId: user._id,
                        score: 0,
                        date: today
                    });
                    console.log(`Habit Score created for ${user.fullname} on ${today}`);
                }
            }
        } catch (err) {
            console.error("Error creating daily habit scores:", err);
        }
    });
}

module.exports = scheduleDailyHabitScore;
