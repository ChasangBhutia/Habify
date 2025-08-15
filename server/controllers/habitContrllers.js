const habitModel = require('../models/habitModel')
const dailyHabitModel = require('../models/dailyHabitModel');
const userModel = require('../models/userModel')

module.exports.createHabit = async (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).json({ success: false, error: "Please enter your habit!" });
    try {
        let user = await userModel.findById(req.user.id);
        if (!user) return res.status(401).json({ success: false, error: "Please login/signup to track your habits." });
        let newHabit = await habitModel.create({
            userId: req.user.id,
            name
        })
        const today = new Date().toLocaleDateString("en-CA", { timeZone: req.user.timezone });
        await dailyHabitModel.create({
            user: req.user.id,
            habit: newHabit._id,
            date: today,
            done: false
        })

        return res.status(201).json({ success: true, message: "Habit Created.", newHabit });
    } catch (err) {
        console.log(`Error creating habit: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong!" });
    }
}

// need to update according to the new database stying
module.exports.getAllHabits = async (req, res) => {
    try {
        let user = await userModel.findById(req.user.id).populate('habits');
        return res.status(200).json({ success: true, message: "All habits found.", habits: user.habits });
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong." });
    }
}

module.exports.markHabit = async (req, res) => {
    const habitId = req.params.habitId;
    if (!habitId) return res.status(404).json({ success: false, error: "Habit not found." });
    try {
        let habit = await dailyHabitModel.findById(habitId);
        if (!habit) return res.status(404).json({ success: false, error: "Habit not found." });
        habit.done = !habit.done;
        await habit.save();
        return res.status(200).json({ success: true, error: "Success marking habit." });

    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong." });
    }
}

//need to update according to new database
module.exports.deleteHabit = async (req, res) => {
    const habitId = req.params.habitId;
    try {
        await habitModel.findByIdAndDelete(habitId);
        await userModel.findByIdAndUpdate(
            req.user.id,
            { $pull: { habits: habitId } },
            { new: true }
        );
        return res.status(200).json({ success: true, message: "Habit deleted." });
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong." });
    }
}