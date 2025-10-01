import React, { useState } from 'react'
import SideMenu from '../../components/SideMenu'
import Navbar from '../../components/Navbar'
import MainContent from '../../components/MainContent'
import { useParams } from 'react-router-dom'

const Home = () => {
  const { section, taskId } = useParams();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isHabitFormOpen, setIsHabitFormOpen] = useState(false);


  return (
    <div className='w-full bg-gray-100 h-screen flex items-center justify-center'>
      <div className="w-full max-w-[1500px] h-[98%] min-w-[800px] m-auto grid grid-cols-[280px_1fr] grid-rows-[60px_1fr]">
        {/* Sidebar */}
        <aside className=" row-span-3">
          <SideMenu />
        </aside>

        {/* Navbar */}
        <header >
          <Navbar section={section} setIsTaskFormOpen={setIsTaskFormOpen} setIsHabitFormOpen={setIsHabitFormOpen} />
        </header>

        {/* Main Content */}
        <main className=" overflow-auto">
          <MainContent section={section} taskId={taskId} isTaskFormOpen={isTaskFormOpen} setIsTaskFormOpen={setIsTaskFormOpen} isHabitFormOpen={isHabitFormOpen} setIsHabitFormOpen={setIsHabitFormOpen} />
        </main>
      </div>
    </div>
  )
}

export default Home
