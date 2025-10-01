import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Paperclip, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskCard = ({ id, title, owner, description, priority, collaborators, type }) => {

    const priorityBgColor = priority === 'High' ? 'bg-[#FF4C4C]' : priority === 'Med' ? 'bg-[#FFA500]' : 'bg-[#4CAF50]';
    const typeBgColor = type === 'Single' ? 'bg-[#2196F3]' : 'bg-[#9C27B0]';

    return (
        <Link to={`/task-manager/${id}`} className='no-underline text-inherit'>
            <div className='bg-white text-black p-4 rounded-xl shadow-md w-full flex flex-col gap-3 mb-5 hover:scale-[1.05] transition-transform cursor-pointer'>
                <header className='flex flex-col justify-between'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-md poppins'>{title.slice(0,21)}...</h2>
                        <button className='cursor-pointer hover:bg-gray-200 p-1 rounded-full'>
                            <MoreVertIcon />
                        </button>
                    </div>
                    <aside className='flex items-center gap-1 text-sm'>
                        <p className={`${priorityBgColor} text-white px-1 rounded`}>{priority}</p>
                        <p className={`${typeBgColor} text-white px-1 rounded`}>{type}</p>

                    </aside>

                </header>
                <div className='flex items-center gap-2 h-9'>
                    <img className='h-8 w-8 rounded' src={owner.image} alt="Owner" />
                    <div className='leading-none'>
                        <p className='text-sm poppins'>{owner.fullname}</p>
                        <time className='text-[13px] text-blue-400 tracking-tighter' datetime="24-06-24">
                            24/06/24 - 12:30 PM
                        </time>
                    </div>
                </div>
                <section className='border-b-2 border-gray-400 pb-3'>
                    <p className='text-zinc-700 text-[13px]'>{description}</p>
                </section>
                <div className='flex gap-3 px-2'>

                    <div className='flex -space-x-4 mr-auto'>
                        {collaborators.map(c => (
                            <img key={c._id} className='h-10 w-10 rounded-full bg-red-900 border-2 border-white' src={c.image} alt="img" />
                        ))}
                    </div>

                    <button className='flex items-center gap-1 text-[15px]'>
                        <Paperclip strokeWidth={1.5} size={20} />
                        <span>0</span>
                    </button>
                    <button className='flex items-center gap-1 hover text-[15px]'>
                        <MessageCircle strokeWidth={1.5} size={20}/>
                        <span>0</span>
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default TaskCard