import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from 'react-router-dom';

const TaskCard = ({ id, title, owner, description, priority, collaborators, type }) => {

    const priorityBgColor = priority === 'High' ? 'bg-[#FF4C4C]' : priority === 'Med' ? 'bg-[#FFA500]' : 'bg-[#4CAF50]';
    const typeBgColor = type === 'Single' ? 'bg-[#2196F3]' : 'bg-[#9C27B0]';

    return (
        <Link to={`/task-manager/${id}`} className='no-underline text-inherit'>
            <div className='bg-gray-700 text-white p-4 rounded-xl shadow-md w-full flex flex-col gap-3 mb-4 hover:scale-[1.05] transition-transform cursor-pointer'>
                <header className='flex justify-between items-center'>
                    <h2 className='text-lg text-yellow-300 poppins'>{title.slice(0, 10)}...</h2>
                    <aside className='flex items-center gap-1'>
                        <p className={`${priorityBgColor} text-white px-1 rounded`}>{priority}</p>
                        <p className={`${typeBgColor} text-white px-1 rounded`}>{type}</p>
                        <button className='cursor-pointer hover:bg-gray-200 p-1 rounded-full'>
                            <MoreVertIcon />
                        </button>
                    </aside>

                </header>
                <div className='flex items-center gap-2'>
                    <img className='h-10 w-10 rounded' src={owner.image} alt="Owner" />
                    <div>
                        <p className='text-sm font-semibold poppins'>{owner.fullname}</p>
                        <time className='text-sm text-blue-400 tracking-tighter poppins' datetime="">
                            24/06/24 - 12:30 PM
                        </time>
                    </div>
                </div>
                <section className='border-b-2 border-gray-400 pb-3'>
                    <p className='text-zinc-300 text-sm'>{description.length > 100 ? description.slice(0, 100) + '...' : description}</p>
                </section>
                <div className='flex gap-4 px-2'>

                    <div className='flex -space-x-4 mr-auto'>
                        {collaborators.map(c => (
                            <img key={c._id} className='h-10 w-10 rounded-full bg-red-900 border-2 border-white' src={c.image} alt="img" />
                        ))}
                    </div>

                    <button className='flex items-center gap-1'>
                        <AttachFileIcon className='rotate-40' />
                        <span>0</span>
                    </button>
                    <button className='flex items-center gap-1 hover'>
                        <ChatBubbleOutlineIcon />
                        <span>0</span>
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default TaskCard