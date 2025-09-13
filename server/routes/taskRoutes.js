const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { searchUserForCollab, getAllTasks, createTask, addCollaborators, createSubTask, assignSubTask, getTask, markSubTask } = require('../controllers/taskControllers');

router.get('/:taskId', isLoggedIn, getTask);
router.get('/', isLoggedIn, getAllTasks);
router.post('/', isLoggedIn, createTask);
router.patch('/:taskId', isLoggedIn, addCollaborators);
router.post('/:taskId/sub-task', isLoggedIn, createSubTask);
router.patch('/sub-task/:subTaskId', isLoggedIn, assignSubTask);
router.patch('/sub-task/:subTaskId/toogle', isLoggedIn, markSubTask);
router.post('/search-user', isLoggedIn, searchUserForCollab);

module.exports = router;
