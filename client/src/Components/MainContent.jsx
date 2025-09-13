import React, { useEffect } from 'react';
import TaskManager from '../pages/Home/TaskManager/TaskManager';
import HabitTracker from '../pages/Home/HabitTracker/HabitTracker';
import CreateTaskForm from './CreateTaskForm';
import { useTaskContext } from '../context/TaskContext';
import TaskWorkspace from '../pages/Home/TaskManager/TaskWorkspace';

const MainContent = ({ section, taskId, isTaskFormOpen, setIsTaskFormOpen }) => {

  const {fetchTask , selectedTask} = useTaskContext();
  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
    }
  },[taskId])

  return (
    <div className="bg-transparent h-full w-full rounded-br-xl p-2">
      <h1 className='fixed top-[50%] left-[51%] z-[1] tracking-wider text-7xl text-yellow-300 opacity-50 poppins'><span class="text-blue-400 poppins">Hab</span>ify</h1>

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
    </div>
  );
};

export default MainContent;
