const express = require('express');
const { createUser, loginUser, logout } = require('../controllers/authControllers');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

router.get('/', (req, res)=>{
    res.json({message:"Its working"});
})

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/logout',isLoggedIn, logout);

module.exports = router;