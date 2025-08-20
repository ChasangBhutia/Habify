const express = require('express');
const { createUser, loginUser, logout, getUser } = require('../controllers/authControllers');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

router.get('/', isLoggedIn, getUser);
router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/logout', isLoggedIn, logout);

module.exports = router;