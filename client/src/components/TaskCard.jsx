import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Paperclip, MessageCircle, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskCard = ({ id, title, owner, description, priority, collaborators, type, subTasks }) => {

    const priorityBgColor = priority === 'High' ? 'bg-[#FF4C4C]' : priority === 'Med' ? 'bg-[#FFA500]' : 'bg-[#4CAF50]';
    const typeBgColor = type === 'Single' ? 'bg-[#2196F3]' : 'bg-[#9C27B0]';

    const doneSubTasks = subTasks.length > 0 ? subTasks.filter(s => s.done) : 0;
    const progress = subTasks.length > 0 ? (doneSubTasks.length / subTasks.length) * 100 : 0;
    

    return (
        <Link to={`/task-manager/${id}`} className='no-underline text-inherit'>
            <div className='bg-white text-black p-2 rounded shadow-md w-full flex flex-col gap-3 mb-5 hover:scale-[1.05] transition-transform cursor-pointer'>
                <header className='flex flex-col justify-between'>
                    <aside className='flex items-center gap-1 text-sm mb-2'>
                        <p className={`bg-gray-200 text-gray-400 px-1 rounded poppins`}>{priority}</p>
                        <p className={`bg-gray-200 text-gray-400 px-1 rounded poppins`}>{type}</p>
                        <button className='ml-auto cursor-pointer hover:bg-gray-200 rounded-full'>
                            <MoreVertIcon />
                        </button>
                    </aside>
                    <div className='flex flex-col'>
                        <h2 className='text-md poppins'>{title}</h2>
                        <p className='poppins text-sm text-zinc-700'>{description}</p>
                    </div>

                </header>

                <section className='border-b-2 border-gray-400 pb-3'>
                    <div className='flex items-center gap-2 mb-2 text-sm'>
                        <Loader width={18} />
                        <p>Progress</p>
                        <p className='ml-auto'>{progress}%</p>
                    </div>
                    <div className='bg-zinc-400 w-full h-[5px] rounded'>
                        <div style={{width:`${progress}%`}} className='bg-zinc-800 h-full rounded'>
                        </div>
                    </div>
                </section>
                <div className='flex gap-3 px-2'>

                    <div className='flex -space-x-4 mr-auto'>
                        {collaborators.map(c => (
                            <img key={c._id} className='h-8 w-8 rounded-full bg-red-900 border-2 border-white' src={c.image} alt="img" />
                        ))}
                    </div>

                    <button className='flex items-center gap-1 text-[15px]'>
                        <Paperclip strokeWidth={1.5} size={20} />
                        <span>0</span>
                    </button>
                    <button className='flex items-center gap-1 hover text-[15px]'>
                        <MessageCircle strokeWidth={1.5} size={20} />
                        <span>0</span>
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default TaskCard