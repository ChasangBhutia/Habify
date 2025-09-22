import React from 'react'
import HabitTable from './HabitTable'
import HabitHeader from './HabitHeader'
import HabitSidebar from './HabitSidebar'

const HabitTracker = () => {
  return (
    <div className='flex gap-3 w-full h-full'>
      <div className='flex flex-col gap-3 w-[73%]'>
        <HabitHeader />
        <HabitTable />
      </div>
      <HabitSidebar />
    </div>
  )
}

export default HabitTracker