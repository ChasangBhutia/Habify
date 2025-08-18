const habitModel = require('../models/habitModel')
const dailyHabitModel = require('../models/dailyHabitModel');
const userModel = require('../models/userModel');
const habitScoreModel = require('../models/habitScoreModel');
const { calculateScore, calculateColor } = require('../utils/calculateHabitScore');

module.exports.createHabit = async (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).json({ success: false, error: "Please enter your habit!" });
    try {
        let user = await userModel.findById(req.user.id);
        if (!user) return res.status(401).json({ success: false, error: "Please login/signup to track your habits." });
        
        //create a new habit on the template-habitModel
        let newHabit = await habitModel.create({
            userId: req.user.id,
            name
        })
        const today = new Date().toLocaleDateString("en-CA", { timeZone: req.user.timezone });
        //create the same habit for daily habit Model so that it can be visible daily
        await dailyHabitModel.create({
            user: req.user.id,
            habit: newHabit._id,
            date: today,
            done: false
        })

        //find habit score for particular day
        const habitScore = await habitScoreModel.findOne({ userId: req.user.id, date: today });

        //finding all habits for calculating the score and setting the background color value
        const allHabits = await dailyHabitModel.find({ user: req.user.id, date: today });
        const score = calculateScore(allHabits);
        const bgColor = calculateColor(score);

        //if the habit score doesn't exist then create a new habit score model with calculated score and bgColor
        if (!habitScore) {
            await habitScoreModel.create({
                userId: req.user.id,
                score,
                title:score,
                date: today,
                backgroundColor:bgColor
            });
        } else { // if already exist then just update the score and bgColor accordingly
            await habitScoreModel.findOneAndUpdate(
                { userId: req.user.id, date: today },
                { score, title: score, backgroundColor: bgColor },
                { upsert: true, new: true }
            )
        }

        return res.status(201).json({ success: true, message: "Habit Created.", newHabit });
    } catch (err) {
        console.log(`Error creating habit: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong!" });
    }
}

module.exports.getAllHabits = async (req, res) => {
    const today = new Date().toLocaleDateString("en-CA", { timeZone: req.user.timezone });
    try {
        let habits = await dailyHabitModel.find({ user: req.user.id, date: today }).populate('habit');
        return res.status(200).json({ success: true, message: "All habits found.", habits });
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong." });
    }
}

module.exports.markHabit = async (req, res) => {
    const habitId = req.params.habitId;

    if (!habitId) return res.status(404).json({ success: false, error: "Habit not found." });
    try {
        const today = new Date().toLocaleDateString("en-CA", { timeZone: req.user.timezone });

        //find the habit by id 
        let habit = await dailyHabitModel.findOne({ _id: habitId, user: req.user.id, date: today });

        if (!habit) return res.status(404).json({ success: false, error: "Habit not found." });
        habit.done = !habit.done;
        await habit.save();

        //finding all habits to calculate score
        const allHabits = await dailyHabitModel.find({ user: req.user.id, date: today });

        const score = calculateScore(allHabits);
        const bgColor = calculateColor(score);
        //update the score in habitScoreModel accordingly when user marks habit as done or not done
        await habitScoreModel.findOneAndUpdate(
            { userId: req.user.id, date: today },
            { score, title: score, backgroundColor: bgColor },
            { upsert: true, new: true }
        )
        return res.status(200).json({ success: true, message: "Success marking habit.", score });

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
        return res.status(200).json({ success: true, message: "Habit deleted." });
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong." });
    }
}

module.exports.getAllHabitScore = async (req, res) => {
    try {
        const scores = await habitScoreModel.find({ userId: req.user.id }).sort({ date: 1 });
        if (!scores) return res.status(404).json({ success: false, error: "Score not found" });
        return res.status(200).json({ success: true, message: "Scores found", scores });
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

//temporory create habit score for testing
module.exports.createHabitScore = async (req, res) => {
    const { date, score, backgroundColor } = req.body;
    try {
        const habitScore = await habitScoreModel.create({
            userId: req.user.id,
            date,
            score,
            title: score,
            backgroundColor
        });
        return res.status(201).json({ success: true, message: "Done", habitScore })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}