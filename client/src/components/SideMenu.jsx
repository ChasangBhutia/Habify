import React, { useState } from 'react'
import { LayoutDashboard, ChartColumn, ClipboardCheck, BotMessageSquare, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const SideMenu = () => {

    const { user, logout } = useAuthContext()
    const [theme, setTheme] = useState('light');
    function handleThemeChange(){
        if(theme === "light")setTheme("dark");
        else setTheme("light")
    }

    function handleLogout() {
        logout();
    }

    return (
        <nav className='bg-white text-black rounded-tl-xl rounded-bl-xl flex flex-col gap-3 h-full pt-3 mr-1'>
            <h1 className='text-2xl poppins px-3'>Habify</h1>

            <div className='text-3xl font-semibold px-3'>
                <p className='poppins'>Hello <span className='text-blue-600'>{user.fullname}</span>,</p>
                <p className='poppins'>Lets do great today. 👋</p>
            </div>

            <div className='mt-5 px-3'>
                <p className='ml-3 text-gray-400 poppins mb-2'>Menu</p>
                <ul className='flex flex-col text-gray-800'>
                    <Link to="/dashboard">
                        <li className='rounded-xl hover:bg-blue-500 hover:text-white pl-3 hover:pl-6 duration-300 py-3 flex gap-3 cursor-pointer'>
                            <LayoutDashboard />
                            <p className='poppins'>Dashboard</p>
                        </li>
                    </Link>
                    <Link to="/habit-tracker">
                        <li className='rounded-xl hover:bg-blue-500 hover:text-white pl-3 hover:pl-6 duration-300 py-3 flex gap-3 cursor-pointer'>
                            <ChartColumn />
                            <p className='poppins'> Habit Tracker</p>
                        </li>
                    </Link>
                    <Link to="/task-manager">
                        <li className='rounded-xl hover:bg-blue-500 hover:text-white pl-3 hover:pl-6 duration-300 py-3 flex gap-3 cursor-pointer'>
                            <ClipboardCheck />
                            <p className='poppins'>Task Manager</p>
                        </li>
                    </Link>
                    <Link to="/ai">
                        <li className='rounded-xl hover:bg-blue-500 hover:text-white pl-3 hover:pl-6 duration-300 py-3 flex gap-3 cursor-pointer'>
                            <BotMessageSquare />
                            <p className='poppins'>HabifyPal</p>
                        </li>
                    </Link>

                </ul>
            </div>
            <div className='mt-auto border-t-2 border-zinc-300'>
                <div className='w-full p-2 rounded-bl-xl flex flex-col items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                        <img className='h-7 w-7 rounded-full' src={user.image} alt={user.fullname} />
                        <h3>{user.fullname}</h3>
                    </div>
                    <p className='text-sm text-zinc-600'>{user.email}</p>
                </div>
                <div className='flex items-center p-2 px-3 justify-between border-t-1 border-zinc-300'>
                    <p className='poppins text-zinc-700'>Theme</p>
                    <button className='flex gap-2 bg-gray-800 shadow relative  p-1 px-2 rounded-2xl shadow-xl text-white' onClick={handleThemeChange}>
                        <Sun strokeWidth={1.2} width={20} className='z-90'/>
                        <div className={`h-6 w-6 rounded-full bg-yellow-700 border border-zinc-500 absolute left-[7px] duration-300 ${theme === "dark" && 'left-[34px]'}`}></div>
                        <Moon strokeWidth={1.2} width={20} className='z-90'/>
                    </button>
                </div>
                <button className='poppins w-full h-12 bg-gray-900 text-white hover:bg-gray-700' onClick={handleLogout}>Logout</button>
            </div>
        </nav >

    )
}

export default SideMenu