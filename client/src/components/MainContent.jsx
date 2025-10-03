import React, { useEffect } from 'react';
import TaskManager from '../pages/Home/TaskManager/TaskManager';
import HabitTracker from '../pages/Home/HabitTracker/HabitTracker';
import { useTaskContext } from '../context/TaskContext';
import TaskWorkspace from '../pages/Home/TaskManager/TaskWorkspace';
import GenericFormModel from './GenericFormModel';
import { useHabitContext } from '../context/HabitContext';

const MainContent = ({ section, taskId, isTaskFormOpen, setIsTaskFormOpen, setIsHabitFormOpen, isHabitFormOpen }) => {

  const { fetchTask, selectedTask, createNewTask } = useTaskContext();
  const {createNewHabit} = useHabitContext();
  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
    }
  }, [taskId])

  return (
    <div className="bg-transparent h-full w-full">
      <h1 className='fixed top-[50%] left-[50%] z-[1] tracking-wider text-7xl text-yellow-300 opacity-50 poppins'><span className="text-blue-400 poppins">Hab</span>ify</h1>

      {taskId ? (
        selectedTask && <TaskWorkspace task={selectedTask} />
      ) : (
        <>
          {section === "task-manager" && <TaskManager />}
          {section === "habit-tracker" && <HabitTracker />}
          {section === "dashboard" && <div>Dashboard</div>}
        </>
      )}

      {/* Task form modal */}
      <GenericFormModel
        isOpen={isTaskFormOpen}
        setIsOpen={setIsTaskFormOpen}
        title="Create New Task"
        submitText="Create Task"
        fields={[
          { name: 'title', placeholder: 'Enter task title' },
          { name: 'description', placeholder: 'Enter description', type: 'textarea' },
          {
            name: 'type', type: 'select', placeholder: 'Select Type', options: [
              { value: 'Single', label: 'Single' },
              { value: 'Group', label: 'Group' }
            ]
          },
          {
            name: 'priority', type: 'select', placeholder: 'Select Priority', options: [
              { value: 'High', label: 'High' },
              { value: 'Med', label: 'Medium' },
              { value: 'Low', label: 'Low' }
            ]
          }
        ]}
        onSubmit={createNewTask}
      />

      <GenericFormModel
        isOpen={isHabitFormOpen}
        setIsOpen={setIsHabitFormOpen}
        title="Add New Habit"
        submitText="Add Habit"
        fields={[
          { name: 'title', placeholder: 'Enter habit title' },
          {
            name: 'type', type: 'select', placeholder: 'Select type', options: [
              { value: 'do', label: 'Do' },
              { value: 'avoid', label: 'Avoid' }
            ]
          },
          {
            name: 'color', type: 'color', options: [
              { value: '#93C5FD' },
              { value: '#FCD34D' },
              { value: '#FCA5A5' },
              { value: '#86EFAC' },
              { value: '#D8B4FE' }
            ]
          }
        ]}
        onSubmit={(data, extra) => createNewHabit(data.title, data.type, extra.color)}
      />

    </div>
  );
};

export default MainContent;