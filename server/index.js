const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const ConnectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');
const taskRoutes = require('./routes/taskRoutes');
const toDoRoutes = require('./routes/toDoRoutes');
const createDailyHabits = require('./cron/dailyHabitCron');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

ConnectDB();
createDailyHabits();

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/toDos', toDoRoutes);

app.listen(3000, ()=>{
    console.log("Server is running on PORT 3000");
});
