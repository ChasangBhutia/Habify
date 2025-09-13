import React, { useState } from 'react'
import SideMenu from '../../components/SideMenu'
import Navbar from '../../components/Navbar'
import MainContent from '../../components/MainContent'
import { useParams } from 'react-router-dom'
import { useTaskContext } from '../../context/TaskContext'
import ErrorBox from '../../components/ErrorBox'
import SuccessBox from '../../components/SuccessBox'

const Home = () => {

  const {error, success} = useTaskContext();
  const {section, taskId} = useParams();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  
  
  return (
    <div className='bg-gray-900 container'>
      {error && <ErrorBox error={error}/>}
      {success && <SuccessBox success={success}/>}
      <div className="max-w-[1500px] mx-auto grid gap-1 p-3 grid-cols-[250px_1fr] grid-rows-[60px_1fr] h-screen ">
      {/* Sidebar */}
      <aside className=" row-span-3">
        <SideMenu />
      </aside>
    
      {/* Navbar */}
      <header >
        <Navbar section={section} setIsTaskFormOpen={setIsTaskFormOpen}/>
      </header>

      {/* Main Content */}
      <main className=" overflow-auto">
        <MainContent section={section} taskId={taskId} isTaskFormOpen={isTaskFormOpen} setIsTaskFormOpen={setIsTaskFormOpen}/>
      </main>
    </div>
    </div>
  )
}

export default Home
