const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const ConnectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');
const taskRoutes = require('./routes/taskRoutes');
const toDoRoutes = require('./routes/toDoRoutes');
const userRoutes = require('./routes/userRoutes');
const createDailyHabits = require('./cron/dailyHabitCron');
const createDailyHabitScore = require("./cron/dailyHabitScoreCron");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

ConnectDB();
createDailyHabits();
createDailyHabitScore();

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/toDos', toDoRoutes);
app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});
