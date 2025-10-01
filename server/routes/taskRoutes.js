const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { upload } = require('../config/cloudinary');
const { searchUserForCollab, getAllTasks, createTask, addCollaborators, createSubTask, assignSubTask, getTask, markSubTask, addComment, uploadFile } = require('../controllers/taskControllers');

//may be changed later 
router.post('/search-user', isLoggedIn, searchUserForCollab);

//main routes for creating , deleting, editing, getting task
router.get('/:taskId', isLoggedIn, getTask);
router.get('/', isLoggedIn, getAllTasks);
router.post('/', isLoggedIn, createTask);
router.patch('/:taskId', isLoggedIn, addCollaborators);

// routes for creating, marking deleting and editing sub tasks
router.post('/:taskId/sub-task', isLoggedIn, createSubTask);
router.patch('/sub-task/:subTaskId', isLoggedIn, assignSubTask);
router.patch('/sub-task/:subTaskId/toggle', isLoggedIn, markSubTask);

// routes for task comments
router.post('/:subTaskId/comment', isLoggedIn, addComment)

//routes to upload files 
router.post('/:subTaskId/file', isLoggedIn, upload.single('file'), uploadFile);

module.exports = router;
