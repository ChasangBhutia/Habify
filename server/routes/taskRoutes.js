const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { getAllTasks, createTask, addCollaborators, createSubTask, assignSubTask, getTask } = require('../controllers/taskControllers');

router.get('/:taskId', isLoggedIn, getTask);
router.get('/', isLoggedIn, getAllTasks);
router.post('/', isLoggedIn, createTask);
router.patch('/:taskId', isLoggedIn, addCollaborators);
router.post('/:taskId/sub-task', isLoggedIn, createSubTask);
router.patch('/sub-task/:subTaskId', isLoggedIn, assignSubTask);

module.exports = router;