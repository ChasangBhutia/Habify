import React, { useRef, useEffect, useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const CreateSubTaskForm = ({ task, isOpen, setIsOpen }) => {

    const { createNewSubTask } = useTaskContext();

    const [subTaskData, setSubTaskData] = useState({
        title: '',
        userId: ''
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
        setSubTaskData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const handleCreateTask = (e) => {
        e.preventDefault();
        createNewSubTask(subTaskData, task._id);

        setSubTaskData({
            title: '',
            userId: '',
        });
        setIsOpen(false);
    }

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex justify-center items-center z-50">
            <div
                ref={modalRef}
                className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
            >
                <h2 className="text-2xl mb-5 text-gray-800 poppins">Create New Sub Task</h2>
                <form onSubmit={handleCreateTask}>
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-1">Title</label>
                        <input
                            onChange={handleChange}
                            value={subTaskData.title}
                            name='title'
                            type="text"
                            placeholder="Enter task title"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className='flex flex-col gap-2 my-2'>
                        <label className="block text-gray-700 mb-1">Assign User: </label>
                        <select value={subTaskData.userId} defaultValue="" className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" name='userId' onChange={handleChange}>
                            <option value="" disabled>Select a User</option>
                            {task.collaborators?.length > 0 ? (
                                task?.collaborators.map(c => (
                                    <option key={c._id} value={c._id}>{c.fullname}</option>
                                ))) : (
                                <option value="" disabled>No collaborators</option>
                            )}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Create Sub Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateSubTaskForm;