import React, { useRef, useEffect, useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const CreateTaskForm = ({ isOpen, setIsOpen }) => {

    const {createNewTask} = useTaskContext();

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        type: 'Single',
        priority: 'High'
    })

    const modalRef = useRef();
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);
    // Close modal if clicked outside
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setTaskData((prev)=>({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const handleCreateTask = (e) => {
        e.preventDefault();
        createNewTask(taskData);
        setTaskData({
            title: '',
            description: '',});
        setIsOpen(false);
    }

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex justify-center items-center z-50">
            <div
                ref={modalRef}
                className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
            >
                <h2 className="text-2xl mb-5 text-gray-800 poppins">Create New Task</h2>
                <form onSubmit={handleCreateTask}>
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-1">Title</label>
                        <input
                            onChange={handleChange}
                            value={taskData.title}
                            name='title'
                            type="text"
                            placeholder="Enter task title"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-1">Description</label>
                        <textarea
                            onChange={handleChange}
                            name='description'
                            value={taskData.description}
                            placeholder="Enter description"
                            className="resize-none w-full h-30 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className='flex justify-between gap-2'>
                        <div className="mb-2 w-1/2">
                            <label className="block text-gray-700 mb-1">Type</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" name='type' onChange={handleChange}>
                                <option value="Single">Single</option>
                                <option value="Group">Group</option>
                            </select>
                        </div>
                        <div className="mb-2 w-1/2">
                            <label className="block text-gray-700 mb-1">Priority</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" name='priority' onChange={handleChange}>
                                <option value="High">High</option>
                                <option value="Med">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskForm;
