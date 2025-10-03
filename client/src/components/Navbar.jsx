import React from 'react';
import { Plus } from 'lucide-react';

const Navbar = ({ section, setIsTaskFormOpen, setIsHabitFormOpen }) => {

  let navHeading = section ? section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ') : 'Task Workspace';
  if(navHeading === 'Ai') {
    navHeading = 'HabifyPal';
  }

  const date = new Date();

  const month = date.toLocaleString('default', { month: 'long' }); // e.g., "September"
  const weekday = date.toLocaleString('default', { weekday: 'long' }); // e.g., "Friday"
  const day = date.getDate(); // e.g., 14

  const fullDate = date.toISOString().split('T')[0]; // e.g., "2025-09-14"
  const monthDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // "2025-09"
  const weekdayDate = fullDate; // Same as fullDate for simplicity

  return (
    <nav className="w-full bg-white border-b-3 border-gray-200 text-black h-full flex items-center justify-between px-5 rounded-tr-xl">
      <h1 className="text-xl poppins">{navHeading}</h1>
      <div className="flex gap-5 items-center">
        {section === 'task-manager' && (
          <button className="bg-blue-500 text-sm p-2 text-white rounded-xl hover:bg-blue-700 flex items-center gap-1" onClick={() => setIsTaskFormOpen(true)}>
            <Plus width={20}/>
            <p>Create Task</p>
          </button>
        )}
         {section === 'habit-tracker' && (
          <button className="bg-blue-500 p-2 text-white rounded-xl text-sm hover:bg-blue-700 flex items-center gap-1" onClick={() => setIsHabitFormOpen(true)}>
            <Plus width={20}/>
            <p>Add Habit</p>
          </button>
        )}
        <div className="flex items-center gap-2">
          <div>
            <time dateTime={monthDate}>
              <p>{month}</p>
            </time>
            <time dateTime={weekdayDate}>
              <p>{weekday}</p>
            </time>
          </div>
          <time dateTime={fullDate} className="bg-blue-500 text-white p-3 rounded-full">
            {day}
          </time>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;