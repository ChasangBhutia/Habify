import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import TaskIcon from '@mui/icons-material/Task';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const SideMenu = () => {

    const { user } = useAuthContext()

    return (
        <nav className='bg-white text-black flex flex-col gap-3 h-full rounded-tl-xl rounded-xl pt-3'>
            <h1 className='text-2xl ml-3'>Habify</h1>

            <p className='text-3xl ml-3'>Hello {user.fullname}, Lets do great today. 👋</p>

            <ul className='flex flex-col m-2 mt-5'>
                <Link to="/dashboard">
                    <li className='rounded hover:bg-blue-500 hover:text-white p-3 flex gap-5 cursor-pointer'>
                        <DashboardIcon />
                        <p>Dashboard</p>
                    </li>
                </Link>
                <Link to="/habit-tracker">
                    <li className='rounded hover:bg-blue-500 hover:text-white p-3 flex gap-5 cursor-pointer'>
                        <StackedLineChartIcon />
                        <p> Habit Tracker</p>
                    </li>
                </Link>
                <Link to="/task-manager">
                    <li className='rounded hover:bg-blue-500 hover:text-white p-3 flex gap-5 cursor-pointer'>
                        <TaskIcon />
                        <p>Task Manager</p>
                    </li>
                </Link>

            </ul>
            <div className='mt-auto border-t border-zinc-300'>
                <button className='w-full p-2 rounded-bl-xl flex flex-col '>
                    <div className='flex gap-4 justify-center items-center'>
                        <img className='h-7 w-7 rounded-full' src={user.image} alt={user.fullname} />
                        <h3>{user.fullname}</h3>
                    </div>
                    <p className='text-sm text-zinc-600'>{user.email}</p>
                    <p className='text-sm text-zinc-600'>Tire: pro</p>
                </button>
            </div>
        </nav>

    )
}

export default SideMenu