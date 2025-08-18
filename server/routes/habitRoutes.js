const express = require('express');
const { createHabit, getAllHabits, markHabit, deleteHabit, getAllHabitScore, createHabitScore } = require('../controllers/habitContrllers');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();


router.post('/',isLoggedIn, createHabit);
router.get('/', isLoggedIn, getAllHabits);
router.patch('/:habitId/toggle', isLoggedIn, markHabit);
router.delete('/:habitId', isLoggedIn, deleteHabit);
router.get('/score', isLoggedIn, getAllHabitScore);

// temporory
router.post('/temp', isLoggedIn, createHabitScore);

module.exports = router;