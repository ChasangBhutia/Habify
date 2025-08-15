const express = require('express');
const { createHabit, getAllHabits, markHabit, deleteHabit } = require('../controllers/habitContrllers');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();


router.post('/',isLoggedIn, createHabit);
router.get('/', isLoggedIn, getAllHabits);
router.patch('/:habitId/toggle', isLoggedIn, markHabit);
router.delete('/:habitId', isLoggedIn, deleteHabit);

module.exports = router;