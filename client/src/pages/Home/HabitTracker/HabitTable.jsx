import React, { useState } from 'react'
import { useHabitContext } from '../../../context/HabitContext'
import AddIcon from '@mui/icons-material/Add';
import { useAlertContext } from '../../../context/AlertContext';
import { fireSchoolPrideConfetti } from '../../../utils/confetti';

const HabitTable = () => {
    const { habits, toggleHabit } = useHabitContext();
    const daysInWeek = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const day = new Date().getDay() ;
    const adjustedDay = (day + 6) % 7;


    const { error, setError } = useAlertContext();

    const handleToggle = (e, dayIndex, habitId, weekId) => {
        if (adjustedDay === dayIndex) {
            toggleHabit(habitId, dayIndex, 0, weekId);
            fireSchoolPrideConfetti(e, ["#0033A0", "#FFD700"]);
        } else {
            setError("You can only mark habit for today");
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    }

    return (
        <div className="p-4 bg-white overflow-y-auto w-full text-black relative z-48">
            {/* Header Row */}
            <div className='flex overflow-y-auto'>
                <div>
                    <div className="flex mb-7 font-semibold">
                        <h3 className="w-50">Title</h3> {/* empty cell for habit names */}
                        {daysInWeek.map((day, index) => (
                            <h3 key={index} className="text-center w-13 mx-3">{day}</h3>
                        ))}
                    </div>
                    <div>

                        {/* Habits Rows */}
                        {habits.map((habit, habitIndex) => (
                            <div key={habitIndex} className="flex items-center mb-2">
                                {/* Habit Title */}
                                <div className='flex gap-3 items-center w-50'>
                                    <div>{habit.type === "avoid" ? <AddIcon sx={{ color: habit.color }} className={`rotate-45`} /> : <div style={{backgroundColor:habit.color}} className={`h-4 w-4 rounded-full`}></div>}</div>
                                    <div className="col-span-1 font-medium ">{habit.title}</div>
                                </div>

                                {/* Habit Days */}
                                {habit?.weeks[0]?.days?.map((day, dayIndex) => (
                                    <div key={dayIndex} className="flex justify-center w-13 mx-3">
                                        <div
                                            style={{ backgroundColor: day.done ? habit.color : 'transparent', border: day.done ? `2px solid black`: `2px solid ${habit.color}` }}
                                            title={day.done ? 'Completed' : 'Not Completed'}
                                            onClick={(e) => handleToggle(e, dayIndex, habit._id, habit.weeks[0]._id)}
                                            className={'w-8 h-8 rounded hover:scale-[1.05]'}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-seibold mb-7">Score</h3>
                    {habits.map(habit => (
                        <p className=' w-8 h-8 my-2 flex items-center' key={habit._id}>
                            {habit.weeks[0].days.reduce((total, day) => total + (day.done ? 1 : 0), 0)}/{habit.weeks[0].days.length}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HabitTable;
