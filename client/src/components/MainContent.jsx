import React, { useEffect } from 'react';
import TaskManager from '../pages/Home/TaskManager/TaskManager';
import HabitTracker from '../pages/Home/HabitTracker/HabitTracker';
import CreateTaskForm from './CreateTaskForm';
import { useTaskContext } from '../context/TaskContext';
import TaskWorkspace from '../pages/Home/TaskManager/TaskWorkspace';
import CreateHabitForm from './CreateHabitForm';

const MainContent = ({ section, taskId, isTaskFormOpen, setIsTaskFormOpen, setIsHabitFormOpen, isHabitFormOpen }) => {

  const {fetchTask , selectedTask} = useTaskContext();
  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
    }
  },[taskId])

  return (
    <div className="bg-transparent h-full w-full rounded-br-xl p-2 pb-0">
      <h1 className='fixed top-[50%] left-[50%] z-[1] tracking-wider text-7xl text-yellow-300 opacity-50 poppins'><span className="text-blue-400 poppins">Hab</span>ify</h1>

      {taskId ? (
        selectedTask && <TaskWorkspace task={selectedTask}/>
      ) : (
        <>
          {section === "task-manager" && <TaskManager />}
          {section === "habit-tracker" && <HabitTracker />}
          {section === "dashboard" && <div>Dashboard</div>}
        </>
      )}

      {/* Task form modal */}
      <CreateTaskForm isOpen={isTaskFormOpen} setIsOpen={setIsTaskFormOpen} />
      <CreateHabitForm isOpen={isHabitFormOpen} setIsOpen={setIsHabitFormOpen}/>
    </div>
  );
};

export default MainContent;