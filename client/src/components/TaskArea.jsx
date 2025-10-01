
import React from 'react'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SubTask from './SubTask';


const TaskArea = ({ task, setIsOpen }) => {

    const navigate = useNavigate();

    const priorityBgColor = task.priority === 'High' ? 'bg-[#FF4C4C]' : task.priority === 'Med' ? 'bg-[#FFA500]' : 'bg-[#4CAF50]';
    const typeBgColor = task.type === 'Single' ? 'bg-[#2196F3]' : 'bg-[#9C27B0]';

    return (
        <div className='bg-white text-black h-full overflow-y-auto scrollbar-hide rounded p-3 pt-0 relative z-2'>
            <header className='sticky bg-white top-0 z-50 flex gap-1 mb-3 pt-3'>
                <h2 className='text-xl mr-auto poppins'>{task.title}</h2>
                <p className={`${priorityBgColor} text-white px-2 py-1 rounded text-sm`}>{task.priority}</p>
                <p className={`${typeBgColor} text-white px-2 py-1 rounded text-sm`}>{task.type}</p>
                <button onClick={() => navigate(-1)} className='ml-4 hover:underline transition-all duration-300'>Back</button>
            </header>

            <section className='flex items-center gap-2 shadow-lg p-2 rounded'>
                <img className='h-9 w-9 rounded-full' src={task?.owner?.image} alt={task?.owner?.fullname} />
                <h3>{task?.owner?.fullname}</h3>
                <p className='bg-blue-500 text-white px-2 py-1 rounded text-sm'>Owner</p>
            </section>

            <section className='mt-4'>
                <h3 className='mb-2 poppins'>Description</h3>
                <p className='text-zinc-700'>{task.description}</p>
            </section>

            <section className='mt-5'>
                <header className='flex items-center justify-between px-2 rounded shadow-lg'>
                    <h3 className='mt-2 mb-2 poppins'>Subtasks</h3>
                    <button className='bg-blue-500 text-white rounded hover:scale-[1.2]' onClick={() => setIsOpen(true)}><AddIcon /></button>
                </header>
                <div className='mt-5'>
                    {task.subTasks.length > 0 ? (
                        task.subTasks.map(st => {
                            return <SubTask key={st._id} task={task} st={st} />
                        })) : <p className='text-center text-zinc-500 text-3xl'>No tasks</p>}

                </div>
            </section>

        </div>
    )
}

export default TaskArea
