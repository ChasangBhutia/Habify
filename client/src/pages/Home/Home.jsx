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
    <div className='bg-gray-200 bgContainer'>
      <div className="max-w-[1500px] mx-auto grid gap-2 p-3 grid-cols-[280px_1fr] grid-rows-[60px_1fr] h-screen ">
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
