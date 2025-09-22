import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useHabitContext } from '../../../context/HabitContext';

const HabitHeader = () => {

    const [weekOrMonth, setWeekOrMonth] = useState('week');
    const { weekScore, habits } = useHabitContext();

    let weekRange = "";
    if (habits.length > 0 && habits[0].weeks.length > 0) {
        const startingDate = habits[0].weeks[0].startDate;
        const endingDate = habits[0].weeks[0].endDate;

        const options = { weekday: "short", month: "short", day: "numeric" };
        const start = new Date(startingDate).toLocaleDateString("en-US", options);
        const end = new Date(endingDate).toLocaleDateString("en-US", options);

        weekRange = `${start} - ${end}`;
    }


    return (
        <header className='bg-white rounded-xl p-3 w-full text-black'>
            <h3 className='poppins text-3xl'>{weekRange}</h3>
            <input className='w-full mt-3 accent-blue-500' readOnly min="0" max="100" type="range" value={weekScore} />
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2 bg-gray-300 w-[fit-content] p-1 rounded-3xl relative'>
                    <div className={`${weekOrMonth === 'month' && 'ml-27'} duration-300 bg-blue-400 fixed w-25 h-10 rounded-3xl z-49`}></div>
                    <button className={`${weekOrMonth === 'week' && 'text-white'} w-25 h-10 rounded-3xl relative z-50`} onClick={() => setWeekOrMonth('week')}>Week</button>
                    <button className={`${weekOrMonth === 'month' && 'text-white'} w-25 h-10 rounded-3xl relative z-50`} onClick={() => setWeekOrMonth('month')}>Month</button>
                </div>
                <div className='flex flex-col items-end'>
                    <p>{weekScore}% achieved</p>
                    <div className='flex items-center'>
                        <div className='h-5 w-5 bg-blue-400 rounded-full mr-2'></div>
                        <p>Do</p>
                        <AddIcon sx={{ color: 'red', fontSize: '30px' }} className='rotate-45 ml-3' />
                        <p>Avoid</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HabitHeader