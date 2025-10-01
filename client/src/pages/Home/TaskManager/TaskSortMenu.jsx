import React from 'react'
import { AlignStartHorizontal, AlignStartVertical } from 'lucide-react';

const TaskSortMenu = () => {
    return (
        <div className='w-full h-12 px-5 bg-white flex gap-40 items-center border-t-3 border-gray-100'>
            <div className='flex gap-4'>
                <button className='flex gap-1 text-zinc-400 hover:bg-blue-500 hover:text-white p-1 rounded px-2'>
                    <AlignStartHorizontal width={20} />
                    <p className='poppins'>Table</p>
                </button>
                <button className='flex gap-1 text-zinc-400 hover:bg-blue-500 hover:text-white p-1 rounded px-2'>
                    <AlignStartVertical width={20} />
                    <p className='poppins'>List</p>
                </button>
            </div>
            <div className='flex gap-10'>
                <button>Completed</button>
                <button>In-Progress</button>
                <button>Not Done</button>
            </div>
        </div>
    )
}

export default TaskSortMenu

