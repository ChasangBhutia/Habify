const habitModel = require('../models/habitModel');
const weekModel = require('../models/habitWeekModel');
const todayHabitModel = require('../models/todaysHabitModel');
const { startOfWeekMonday, endOfWeekSunday, buildWeekDaysArray, normalizeToDay } = require('../utils/date');
const { calculateTodaysScore, calculateWeekScore } = require('../utils/calculateHabitScore');

// Create Habit + initial week
module.exports.createHabit = async (req, res) => {
  try {
    const { title, type, color } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: "Title is required." });
    }

    // 1. Create base habit
    const habit = await habitModel.create({
      userId: req.user.id,
      title,
      type,
      color,
    });

    // 2. Create todayHabit (normalized date)
    const todayHabit = await todayHabitModel.create({
      userId: req.user.id,
      habitId: habit._id,
      done: false,
      date: normalizeToDay(new Date()),
    });

    // 3. Build initial week
    const start = startOfWeekMonday(new Date());
    const end = endOfWeekSunday(start);
    const days = buildWeekDaysArray(start);

    const week = await weekModel.create({
      userId: req.user.id,
      habitId: habit._id,
      startDate: start,
      endDate: end,
      days,
      weekHabitscore: 0,
    });

    // 4. Attach week to habit
    habit.weeks.push(week._id);
    await habit.save();

    return res.status(201).json({
      success: true,
      message: "Habit created successfully",
      habit,
      currentWeek: week,
      todayHabit,
    });
  } catch (err) {
    console.error(`Error creating habit: ${err.message}`);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports.getHabits = async (req, res) => {
  try {
    const habits = await habitModel.find({ userId: req.user.id }).populate('weeks');
    const todayHabits = await todayHabitModel.find({ userId: req.user.id, date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lte: new Date(new Date().setHours(23, 59, 59, 999)) } }).populate('habitId');
    return res.status(200).json({ success: true, message: "Habits found", habits, todayHabits });
  } catch (err) {
    console.log(`Error fetching data: ${err.message}`);
    return res.status(500).json({ success: false, error: err.message })
  }
}

module.exports.markHabit = async (req, res) => {
  const { habitId } = req.params;
  const { dayIndex, weekIndex, weekId } = req.body;

  // ✅ check properly for undefined
  if (dayIndex === undefined || weekIndex === undefined) {
    return res.status(400).json({ success: false, error: "dayIndex and weekIndex are required" });
  }
  try {
    const habit = await weekModel.findOne({ _id: weekId, habitId: habitId });
    const todayHabit = await todayHabitModel.findOne({ userId: req.user.id, habitId: habitId, date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lte: new Date(new Date().setHours(23, 59, 59, 999)) } });

    if (!habit) {
      return res.status(404).json({ success: false, error: "Habit not found!" });
    }
    if (
      dayIndex < 0 || dayIndex >= habit.days.length
    ) {
      return res.status(400).json({ success: false, error: "Invalid week/day index" });
    }
    // ✅ toggle done value
    habit.days[dayIndex].done = !(habit.days[dayIndex].done);
    await habit.save();
    todayHabit.done = habit.days[dayIndex].done;
    await todayHabit.save();

    return res.status(200).json({
      success: true,
      message: "Habit marked.",
      habit,
    });
  } catch (err) {
    console.error(`Error marking habit: ${err.message}`);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports.getTodayScore = async (req, res) => {
  try {
    // Normalize today’s start and end time
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch today’s habits for the user
    const todayHabits = await todayHabitModel.find({
      userId: req.user.id,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    // Calculate today’s score
    const todayScore = calculateTodaysScore(todayHabits);

    return res.status(200).json({ success: true, todayScore });

  } catch (err) {
    console.error(`Error fetching today's score: ${err.message}`);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


module.exports.getWeekScore = async (req, res) => {
  try{
    const targetDate = new Date();
    targetDate.setHours(0,0,0,0);

    const weeks = await weekModel.find({
      userId: req.user.id,
      startDate: { $lte: targetDate },
      endDate: { $gte: targetDate }
    });
    if(weeks.length === 0) return res.status(404).json({success:false, error: "No week data found for current week."});
    const weekScore = calculateWeekScore(weeks);
    return res.status(200).json({success:true, weekScore});
  }catch(err){
    console.log(err.message);
    return res.status(500).json({success:false, error: "Internal Server Error"});
  }
}


// Get current week for habit (lazy create if missing)
// module.exports.getCurrentWeek = async (req, res) => {
//   try {
//     const { habitId } = req.params;
//     const habit = await Habit.findById(habitId);
//     if (!habit) return res.status(404).json({ error: 'Habit not found' });

//     const today = new Date();
//     const start = startOfWeekMonday(today);

//     let week = await Week.findOne({ habitId: habit._id, startDate: start });
//     if (!week) {
//       const end = endOfWeekSunday(start);
//       const days = buildWeekDaysArray(start);
//       week = new Week({ habitId: habit._id, startDate: start, endDate: end, days });
//       await week.save();

//       habit.weeks.push(week._id);
//       await habit.save();
//     }

//     res.json({ habit, currentWeek: week });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Update daily score by index (0=Mon, ... 6=Sun)
// module.exports.updateDayByIndex = async (req, res) => {
//   try {
//     const { habitId, weekId, dayIndex } = req.params;
//     const { score } = req.body;
//     const idx = parseInt(dayIndex, 10);

//     if (isNaN(idx) || idx < 0 || idx > 6)
//       return res.status(400).json({ error: 'dayIndex must be 0-6' });

//     const week = await Week.findOne({ _id: weekId, habitId });
//     if (!week) return res.status(404).json({ error: 'Week not found' });

//     week.days[idx].score = score;
//     await week.save();
//     res.json(week);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Update daily score by exact date
// module.exports.updateDayByDate = async (req, res) => {
//   try {
//     const { habitId } = req.params;
//     const { date, score } = req.body;
//     const target = new Date(date);
//     target.setHours(0, 0, 0, 0);

//     const week = await Week.findOne({
//       habitId,
//       startDate: { $lte: target },
//       endDate: { $gte: target }
//     });

//     if (!week) return res.status(404).json({ error: 'No week found for given date' });

//     const dayIndex = week.days.findIndex(d => d.date.toISOString() === target.toISOString());
//     if (dayIndex === -1) return res.status(404).json({ error: 'Day not found in week' });

//     week.days[dayIndex].score = score;
//     await week.save();
//     res.json(week);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Get habit history (all weeks)
// exports.getHistory = async (req, res) => {
//   try {
//     const { habitId } = req.params;
//     const weeks = await Week.find({ habitId }).sort({ startDate: -1 }).lean();
//     res.json(weeks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
