import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useTaskContext } from '../context/TaskContext';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TaskArea = ({ task, setIsOpen }) => {

    const { changeSubTaskProgress } = useTaskContext();
    const [openDropDown, setOpenDropDown] = useState(null);

    const handleDropdownToggle = (subTaskId) => {
        setOpenDropDown(openDropDown === subTaskId ? null : subTaskId);
    };

    const handleProgressSelect = (subTaskId, progress) => {
        changeSubTaskProgress(subTaskId, task._id, progress);
        setOpenDropDown(null)
    }


    const navigate = useNavigate();

    const priorityBgColor = task.priority === 'High' ? 'bg-[#FF4C4C]' : task.priority === 'Med' ? 'bg-[#FFA500]' : 'bg-[#4CAF50]';
    const typeBgColor = task.type === 'Single' ? 'bg-[#2196F3]' : 'bg-[#9C27B0]';

    return (
        <div className='bg-gray-700 text-white h-full overflow-y-auto scrollbar-hide rounded p-3 pt-0 relative z-2'>
            <header className='sticky bg-gray-700 top-0 z-50 flex gap-1 mb-3 pt-3'>
                <h2 className='text-xl mr-auto poppins'>{task.title}</h2>
                <p className={`${priorityBgColor} text-white px-2 py-1 rounded text-sm`}>{task.priority}</p>
                <p className={`${typeBgColor} text-white px-2 py-1 rounded text-sm`}>{task.type}</p>
                <button onClick={() => navigate(-1)} className='ml-4'>Back</button>
            </header>

            <section className='flex items-center gap-2 shadow-lg p-2 rounded'>
                <img className='h-9 w-9 rounded-full' src={task?.owner?.image} alt={task?.owner?.fullname} />
                <h3>{task?.owner?.fullname}</h3>
                <p className='bg-blue-500 text-white px-2 py-1 rounded text-sm'>Owner</p>
            </section>

            <section className='mt-4'>
                <h3 className='mb-2 poppins'>Description</h3>
                <p className='text-zinc-300'>{task.description}</p>
            </section>

            <section className='mt-5'>
                <header className='flex items-center justify-between px-2 rounded shadow-lg shadow-zinc-600'>
                    <h3 className='mt-2 mb-2 poppins'>Subtasks</h3>
                    <button className='bg-blue-500 text-white rounded hover:scale-[1.2]' onClick={() => setIsOpen(true)}><AddIcon /></button>
                </header>
                <div className='mt-5'>
                    {task.subTasks.length>0 ? (
                        task.subTasks.map(st => {
                        const bgColor = st.progress === 'not done'
                            ? 'bg-[#FF4C4C]'
                            : st.progress === 'in progress'
                                ? 'bg-[#FFA500]'
                                : 'bg-[#4CAF50]';

                        return (
                            <section key={st._id} className='mb-3 border-b border-zinc-400 p-2'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <span className='poppins text-sm font-semibold'>{st.title}</span>
                                        <div className='flex gap-2'>
                                            <p className='text-sm'>To:</p>
                                            <img className='h-5 w-5 rounded' src={st?.assignee?.image} alt={st?.assignee?.fullname} />
                                            <p className='text-sm'>{st?.assignee?.fullname}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <div className='relative'>
                                            <button className={`${bgColor} mr-1 px-1 text-sm rounded text-white`}>
                                                {st.progress}
                                            </button>
                                            <button className='cursor-pointer hover:scale-[1.2] bg-zinc-200 rounded' onClick={() => handleDropdownToggle(st._id)}>
                                                {openDropDown !== st._id ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                                            </button>
                                            <ul
                                                className={`absolute bg-zinc-100 text-center w-40 top-8 z-50 right-0 flex gap-2 flex-col shadow transition-all duration-500 ease-in-out transform origin-top ${openDropDown === st._id
                                                    ? 'h-[fit-content] p-3 scale-100'
                                                    : 'h-0 p-0 scale-95 pointer-events-none'
                                                    }`}
                                            >
                                                <li className={`${openDropDown === st._id ? 'block ' : 'hidden '}cursor-pointer shadow hover:bg-zinc-200 rounded px-2 py-1`} onClick={() => handleProgressSelect(st._id, 'done')}>Done</li>
                                                <li className={`${openDropDown === st._id ? 'block ' : 'hidden '}cursor-pointer shadow hover:bg-zinc-200 rounded px-2 py-1`} onClick={() => handleProgressSelect(st._id, 'not done')}>Not Done</li>
                                                <li className={`${openDropDown === st._id ? 'block ' : 'hidden '}cursor-pointer shadow hover:bg-zinc-200 rounded px-2 py-1`} onClick={() => handleProgressSelect(st._id, 'in progress')}>In Progress</li>
                                            </ul>
                                        </div>
                                        <div className='flex gap-3 justify-end'>
                                            <button className='flex text-sm items-center gap-1'>
                                                <AttachFileIcon className='rotate-40' />
                                                <span>0</span>
                                            </button>
                                            <button className='flex text-sm items-center gap-1'>
                                                <ChatBubbleOutlineIcon />
                                                <span>0</span>
                                            </button>
                                        </div>
                                    </div>

                                </div>

                            </section>
                        );
                    })): <p className='text-center text-zinc-300 text-3xl'>No tasks</p>}

                </div>
            </section>

        </div>
    )
}

export default TaskArea