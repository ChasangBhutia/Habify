import React from 'react'
import { useHabitContext } from '../../../context/HabitContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const HabitSidebar = () => {

    const { habits, todayHabits, todayScore, toggleHabit } = useHabitContext();
    // Convert local date to ISO string in YYYY-MM-DDTHH:mm:ss.sssZ format
    // by constructing it manually
    const today = new Date();

    // Helper to get YYYY-MM-DD string in user's LOCAL time
    function toLocalDateString(dateStr) {
        const d = new Date(dateStr); // this is in UTC from DB, converted automatically
        const pad = n => String(n).padStart(2, "0");

        // Use LOCAL time getters (important!)
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    }

    // Today's date in user's local time
    const todayStr = toLocalDateString(today);

    // Filter habits
    const filteredHabits = habits.map(habit => {
        const newHabit = { ...habit };

        newHabit.weeks = newHabit.weeks?.map(week => {
            return {
                ...week,
                days: week.days?.filter(
                    day => toLocalDateString(day.date) === todayStr
                ) || []
            };
        }) || [];

        return newHabit;
    });

    console.log("Today (local):", todayStr);
    console.log(filteredHabits);








    return (
        <div className='bg-white text-black rounded-xl p-3 w-[27%] h-full'>
            <h2 className="text-2xl poppins">Today's Score</h2>
            <input className='w-full' type="range" min="0" max="100" value={todayScore} />
            <p>{todayScore}% of daily goal achieved</p>
            <div className='overflow-y-auto max-h-[70vh] mt-4'>
                {todayHabits.map(habit => (
                    <div key={habit._id} style={{ backgroundColor: habit.done ? habit?.habitId?.color : 'transparent', borderLeft: habit?.done ? ' none' : `4px solid ${habit?.habitId?.color}` }} className={`${habit.done ? 'text-white' : 'text-black'} text-bold rounded flex justify-between flex-col gap-2 my-2 p-2`}>
                        <div className='flex items-center justify-between w-full'>
                            <h3 className='text-lg poppins'>{habit?.habitId?.title}</h3>
                            <MoreVertIcon className='cursor-pointer' />
                        </div>
                        <div>
                            <button onClick={() => toggleHabit(habit._id, dayIndex, weekIndex, weekId)} className={`${habit.done ? 'border-white text-white' : 'border-black text-black'} font-bold border w-full py-2 rounded`}>
                                {habit.done ? 'Completed' : 'Mark as done'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HabitSidebar