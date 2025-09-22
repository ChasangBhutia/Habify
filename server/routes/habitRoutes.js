const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitControllers');
const isLoggedIn = require('../middleware/isLoggedIn');

// Create a habit
router.post('/',isLoggedIn, habitController.createHabit);

router.get('/',isLoggedIn, habitController.getHabits)
router.put('/:habitId', isLoggedIn, habitController.markHabit)
router.get('/today/score', isLoggedIn, habitController.getTodayScore)
router.get('/week/score', isLoggedIn, habitController.getWeekScore)

// // Get current week (lazy create if missing)
// router.get('/:habitId/current', habitController.getCurrentWeek);

// // Update day score by index (0=Mon ... 6=Sun)
// router.put('/:habitId/weeks/:weekId/days/:dayIndex', habitController.updateDayByIndex);

// // Update day score by date (YYYY-MM-DD)
// router.put('/:habitId/day', habitController.updateDayByDate);

// // Get history (all weeks for a habit)
// router.get('/:habitId/history', habitController.getHistory);

module.exports = router;
