const sendMessage = require("../config/nodemailer");
const subTaskModel = require("../models/subTaskModel");
const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");

module.exports.createTask = async (req, res) => {
    const { title, description, type } = req.body;
    if (!title || !description || !type) return res.status(400).json({ success: false, error: "All fields are required." });
    try {
        const task = await taskModel.create({
            title,
            description,
            type,
            owner: req.user.id
        })
        return res.status(201).json({ success: true, message: "Task created.", task });
    } catch (err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: err.message });
    }
}

module.exports.getAllTasks = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).populate('collabTasks');
        const tasks = await taskModel.find({ owner: req.user.id })
            .populate('subTasks')
            .populate('collaborators')
            .populate('owner');
        if (!tasks) return res.status(404).json({ success: false, error: "No task found." });
        return res.status(200).json({ success: true, message: "Tasks found.", tasks, collabTasks: user.collabTasks });

    } catch (err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports.getTask = async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) return res.status(404).json({ success: false, error: "Task Id not found" });
    try {
        const task = await taskModel.findById(taskId)
            .populate('owner')
            .populate('collaborators')
            .populate('subTasks');
        if (!task) return res.status(404).json({ success: false, error: "Task not found" });
        return res.status(200).json({ success: true, message: "Task found", task });
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

//this is only for group task
module.exports.addCollaborators = async (req, res) => {
    const { taskId } = req.params;
    const { userId } = req.body;
    if (!taskId) return res.status(404).json({ success: false, error: "Task id not found" });
    if (!userId) return res.status(404).json({ success: false, error: "User id not found" });
    try {
        const task = await taskModel.findById(taskId);
        if (!task) return res.status(404).json({ success: false, error: "Task not found!" });
        const exists = await taskModel.exists({ _id: taskId, collaborators: userId });
        if (exists) return res.status(409).json({ success: false, error: "User already added." });
        task.collaborators.push(userId);
        await task.save();
        const user = await userModel.findById(userId);
        user.collabTasks.push(task._id);
        await user.save();
        sendMessage(user.email);
        return res.status(200).json({ success: true, message: "User added to your Project." });
    } catch (err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports.createSubTask = async (req, res) => {
    const { title, userId } = req.body;
    const { taskId } = req.params;
    if (!title) return res.status(400).json({ success: false, error: "Title is required." });
    if (!taskId) return res.status(400).json({ success: false, error: "Task Id not found" });
    try {
        const subTask = await subTaskModel.create({
            title,
            owner: req.user.id
        })
        const task = await taskModel.findById(taskId);
        task.subTasks.push(subTask._id);
        await task.save();
        if (userId) subTask.assignees.push(userId);
        await subTask.save();
        return res.status(201).json({ success: true, message: "Sub Task created", subTask });
    } catch (err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

// only for group projects
module.exports.assignSubTask = async (req, res) => {
    const { userId } = req.body;
    const { subTaskId } = req.params;
    if (!userId || !subTaskId) return res.status(400).json({ success: false, error: "Id not found" });
    try {
        const subTask = await subTaskModel.findById(taskId);
        subTask.assignees.push(userId);
        await subTask.save();
        return res.status(200).json({ success: true, message: 'User assigned with the task.' });
    } catch (err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports.setSubTaskProgress = async (req, res) => {
    const { subTaskId } = req.params;
    const { progress } = req.body;
    if (!progress) return res.status(400).json({ success: false, error: "Please Enter the progress" });
    if (!subTaskId) return res.status(400).json({ success: false, error: "Sub task Id not found" });
    try {
        await subTaskModel.findByIdAndUpdate(subTaskId,
            { progress },
            { new: true }
        );
        return res.status(200).json({ success: true, message: "Progress updated" });
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}
