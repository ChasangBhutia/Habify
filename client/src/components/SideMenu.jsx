import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import TaskIcon from '@mui/icons-material/Task';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const SideMenu = () => {

    const { user, logout } = useAuthContext()

    function handleLogout() {
        logout();
    }

    return (
        <nav className='bg-white px-2 text-black rounded-tl-xl rounded-bl-xl flex flex-col gap-3 h-full pt-3 mr-1'>
            <h1 className='text-2xl poppins'>Habify</h1>

            <div className='text-4xl font-semibold'>
                <p className='poppins'>Hello <span className='text-blue-600'>{user.fullname}</span>,</p>
                <p className='poppins'>Lets do great today. 👋</p>
            </div>

            <div className='mt-5'>
                <p className='ml-3 text-gray-400 poppins mb-2'>Menu</p>
                <ul className='flex flex-col text-gray-800'>
                    <Link to="/dashboard">
                        <li className='rounded-xl hover:bg-blue-500 hover:text-white p-2 py-3 flex gap-5 cursor-pointer'>
                            <DashboardIcon />
                            <p className='poppins'>Dashboard</p>
                        </li>
                    </Link>
                    <Link to="/habit-tracker">
                        <li className='rounded-xl hover:bg-blue-500 hover:text-white p-2 py-3 flex gap-5 cursor-pointer'>
                            <StackedLineChartIcon />
                            <p className='poppins'> Habit Tracker</p>
                        </li>
                    </Link>
                    <Link to="/task-manager">
                        <li className='rounded-xl hover:bg-blue-500 hover:text-white p-2 py-3 flex gap-5 cursor-pointer'>
                            <TaskIcon />
                            <p className='poppins'>Task Manager</p>
                        </li>
                    </Link>
                    <Link to="/ai">
                        <li className='rounded-xl hover:bg-blue-500 hover:text-white p-2 py-3 flex gap-5 cursor-pointer'>
                            <TipsAndUpdatesIcon />
                            <p className='poppins'>HabifyPal</p>
                        </li>
                    </Link>

                </ul>
            </div>
            <div className='mt-auto border-t border-zinc-300'>
                <button className='w-full p-2 rounded-bl-xl flex flex-col '>
                    <div className='flex gap-4 justify-center items-center'>
                        <img className='h-7 w-7 rounded-full' src={user.image} alt={user.fullname} />
                        <h3>{user.fullname}</h3>
                    </div>
                    <p className='text-sm text-zinc-600'>{user.email}</p>
                    <p className='text-sm text-zinc-600'>Tire: pro</p>
                </button>
                <button className='poppins bg-gray-400 text-zinc-800 w-full h-12 hover:bg-gray-700 hover:text-white' onClick={handleLogout}>Logout</button>
            </div>
        </nav>

    )
}

export default SideMenu