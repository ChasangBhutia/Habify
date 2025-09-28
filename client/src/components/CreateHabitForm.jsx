import React, { useRef, useEffect, useState } from 'react';
import { useHabitContext } from '../context/HabitContext';

const CreateHabitForm = ({ isOpen, setIsOpen }) => {

    const { createNewHabit } = useHabitContext();

    const [habitData, setHabitData] = useState({
        title: '',
        type: '',
    })

    const [color, setColor] = useState('');

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
        setHabitData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const handleCreateTask = (e) => {
        e.preventDefault();
        createNewHabit(habitData.title, habitData.type, color);
        setHabitData({
            title: '',
            type: '',
        });
        setColor('');
        setIsOpen(false);
    }

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex justify-center items-center z-50">
            <div
                ref={modalRef}
                className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
            >
                <h2 className="text-2xl mb-5 text-gray-800 poppins">Add New habit</h2>
                <form onSubmit={handleCreateTask}>
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-1 poppins">Title</label>
                        <input
                            onChange={handleChange}
                            value={habitData.title}
                            name='title'
                            type="text"
                            placeholder="Enter task title"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-1 poppins">Type</label>
                        <select
                            defaultValue=""
                            onChange={handleChange}
                            name='type'
                            className="w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="" disabled>Type</option>
                            <option value="do">Do</option>
                            <option value="avoid">Avoid</option>
                        </select>
                    </div>
                    <div className='mb-5'>
                        <label className="block text-gray-700 mb-2 font-medium poppins">Select Color Theme:</label>
                        <div className="flex gap-3">

                            <button type="button" onClick={() => setColor('#93C5FD')} className={`${color === '#93C5FD' && 'ring-blue-300 ring-5'} h-9 w-9 rounded-full bg-blue-200 border border-blue-400 hover:ring-2 hover:ring-blue-300 transition`}></button>
                            <button type="button" onClick={() => setColor('#FCD34D')} className={`${color === '#FCD34D' && 'ring-yellow-300 ring-5'} h-9 w-9 rounded-full bg-yellow-200 border border-yellow-400 hover:ring-2 hover:ring-yellow-300 transition`}></button>
                            <button type="button" onClick={() => setColor('#FCA5A5')} className={`${color === '#FCA5A5' && 'ring-red-300 ring-5'} h-9 w-9 rounded-full bg-red-200 border border-red-400 hover:ring-2 hover:ring-red-300 transition`}></button>
                            <button type="button" onClick={() => setColor('#86EFAC')} className={`${color === '#86EFAC' && 'ring-green-300 ring-5'} h-9 w-9 rounded-full bg-green-200 border border-green-400 hover:ring-2 hover:ring-green-300 transition`}></button>
                            <button type="button" onClick={() => setColor('#D8B4FE')} className={`${color === '#D8B4FE' && 'ring-purple-300 ring-5'} h-9 w-9 rounded-full bg-purple-200 border border-purple-400 hover:ring-2 hover:ring-purple-300 transition`}></button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Add Habit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateHabitForm;