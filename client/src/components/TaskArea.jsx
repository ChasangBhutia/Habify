
import React from 'react'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SubTask from './SubTask';
import { Flag, CircleUserRound, Users, TextSelect } from 'lucide-react';


const TaskArea = ({ task, setIsOpen, setIsSearchFormOpen }) => {

    const navigate = useNavigate();

    const priorityBgColor = task.priority === 'High' ? '#FF4C4C' : task.priority === 'Med' ? '#FFA500' : '#4CAF50';
    const typeBgColor = task.type === 'Single' ? '#2196F3' : '#9C27B0';

    return (
        <div className='bg-white text-black h-full overflow-y-auto scrollbar-hide rounded p-3 relative z-2'>

            <header className='flex justify-between'>
                <h2 className='text-xl poppins'>{task.title}</h2>
                <button onClick={() => navigate(-1)} className='ml-4 hover:underline transition-all duration-300'>Back</button>
            </header>


            <section className='flex flex-col mt-4 gap-2'>
                <div className='flex gap-1 text-md items-center '>
                    <Flag width={15} className='text-gray-600' />
                    <p className='text-gray-600 poppins mr-6'>Priority: </p>
                    <p style={{ color: priorityBgColor }} className='poppins'>{task.priority}</p>
                </div>
                <div className='flex gap-1 text-md items-center '>
                    <CircleUserRound width={17} className='text-gray-600' />
                    <p className='text-gray-600 poppins mr-6'>Owner: </p>
                    <div className='bg-zinc-200 flex gap-1 rounded-xl py-[2px] px-2 text-sm items-center'>
                        <img className="h-5 w-5 rounded-full" src={task.owner.image} alt="Owner" />
                        <p className='poppins text-gray-500'>
                            {task.owner.fullname}
                        </p>
                    </div>
                </div>

                {
                    task.type === 'Group' &&
                    <div className='flex gap-1 text-md items-center '>
                        <Users width={17} className='text-gray-600' />
                        <p className='text-gray-600 poppins mr-6'>Assignee: </p>
                        {
                            task.collaborators.map(c => (
                                <div className='bg-zinc-200 flex gap-1 rounded-xl py-[2px] px-2 text-sm items-center'>
                                    <img className="h-5 w-5 rounded-full" src={c.image} alt="Owner" />
                                    <p className='poppins text-gray-500'>
                                        {c.fullname}
                                    </p>
                                </div>
                            ))
                        }
                        <div className='flex gap-1 items-center cursor-pointer ml-2 text-blue-500 hover:text-blue-900'>
                            <Users width={17} />
                            <button className='text-sm poppins' onClick={()=>setIsSearchFormOpen(true)}>Invite People</button>
                        </div>

                    </div>
                }

                <div className='flex flex-col'>
                    <div className='flex gap-1 text-md items-center mb-1'>
                        <TextSelect width={17} className='text-gray-600' />
                        <h3 className='text-gray-600 poppins'>Description</h3>
                    </div>
                    <p className='text-zinc-500 poppins border p-1 px-2 rounded text-sm'>{task.description}</p>
                </div>
            </section>

            <section className='mt-4'>
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
