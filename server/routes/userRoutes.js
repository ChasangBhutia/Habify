const express = require('express');
const router = express.Router();
const { searchUser } = require('../controllers/userControllers');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/search', isLoggedIn, searchUser);

module.exports = router;