import React, { useEffect, useState } from 'react'
import { useTaskContext } from '../context/TaskContext';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SubTaskInputForm from './SubTaskInputForm';


const SubTask = ({ task, st }) => {

    const { changeSubTaskProgress } = useTaskContext();
    const [openDropDown, setOpenDropDown] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [inputType, setInputType] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        if(!inputType) setIsOpen(false);
        if(inputType === 'comment' || inputType === 'file') setIsOpen(true);
        else setInputType(false); 
    },[inputType])

    const handleDropdownToggle = (subTaskId) => {
        setOpenDropDown(openDropDown === subTaskId ? null : subTaskId);
    };

    const handleMenuToggle = (subTaskId) => {
        setOpenMenu(openMenu === subTaskId ? null : subTaskId);
    };

    const handleProgressSelect = (subTaskId, progress) => {
        changeSubTaskProgress(subTaskId, task._id, progress);
        setOpenDropDown(null)
    }
     const handleSetInputType = (type) => {
        setInputType(type);
        setOpenMenu(null);
    }

    const bgColor = st.progress === 'not done'
        ? 'bg-[#FF4C4C]'
        : st.progress === 'in progress'
            ? 'bg-[#FFA500]'
            : 'bg-[#4CAF50]';

    return (
        <section key={st._id} className='mb-3 border-b border-zinc-400 p-2'>
            <div className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                    <span className='poppins text-sm font-semibold'>{st.title}</span>
                    <div className='relative'>
                        <button className={`${bgColor} mr-1 px-1 text-sm rounded text-white`}>
                            {st.progress}
                        </button>
                        <button className='cursor-pointer scale-[0.9] hover:scale-[1.1] bg-zinc-200 rounded' onClick={() => handleDropdownToggle(st._id)}>
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
                </div>

                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <p className='text-sm'>To:</p>
                        <img className='h-5 w-5 rounded' src={st?.assignee?.image} alt={st?.assignee?.fullname} />
                        <p className='text-sm'>{st?.assignee?.fullname}</p>
                    </div>

                    <div className='flex gap-3 justify-end relative'>
                        <button className='flex text-sm items-center gap-1'>
                            <AttachFileIcon className='rotate-40' />
                            <span>{st.files?.length}</span>
                        </button>
                        <button className='flex text-sm items-center gap-1'>
                            <ChatBubbleOutlineIcon />
                            <span>{st.comments?.length}</span>
                        </button>
                        <button onClick={() => handleMenuToggle(st._id)}><MoreVertIcon /></button>
                        <ul
                            className={`absolute bg-zinc-100 text-center w-40 top-8 z-50 right-0 flex gap-2 flex-col shadow transition-all duration-500 ease-in-out transform origin-top ${openMenu === st._id
                                ? 'h-[fit-content] p-3 scale-100'
                                : 'h-0 p-0 scale-95 pointer-events-none'
                                }`}
                        >
                            <li className={`${openMenu === st._id ? 'block ' : 'hidden '}cursor-pointer shadow hover:bg-zinc-200 rounded px-2 py-1`} onClick={() => handleSetInputType('comment')}>Add Comment</li>
                            <li className={`${openMenu === st._id ? 'block ' : 'hidden '}cursor-pointer shadow hover:bg-zinc-200 rounded px-2 py-1`} onClick={() => handleSetInputType('file')}>Upload Files</li>
                        </ul>
                    </div>
                </div>
                <SubTaskInputForm subTaskId={st._id} setInputType={setInputType} inputType={inputType} isOpen={isOpen} setIsOpen={setIsOpen}/>

            </div>

        </section>
    )
}

export default SubTask