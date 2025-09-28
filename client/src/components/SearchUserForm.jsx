import React, { useRef, useEffect, useState } from 'react';
import { useUserContext } from '../context/userContext';
import { useTaskContext } from '../context/TaskContext';

const SearchUserForm = ({ taskId, isOpen, setIsOpen }) => {

    const { users, searchUsers } = useUserContext();
    const { addCollabInTask } = useTaskContext();
    const [email, setEmail] = useState('');

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

    const searchUser = (e) => {
        e.preventDefault();
        searchUsers(email);
        setEmail('');
    }

    const addCollab = (userId) => {
        addCollabInTask(userId, taskId);
        setIsOpen(false);
    }

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex justify-center items-center z-50">
            <div
                ref={modalRef}
                className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
            >
                <h2 className="text-2xl mb-2 text-gray-800 poppins">Add Collaborators</h2>
                <p className='poppins mb-3'>Search user by email and add them to your exicting projects to work in collaboration.</p>
                <form onSubmit={searchUser}>
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name='email'
                            type="email"
                            placeholder="jhon213@gmail.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </form>
                <div>
                    {users.length > 0 && users.map(user => (
                        <div key={user._id} className='flex items-center mb-3 bg-zinc-100 p-2 rounded mt-3'>
                            <img className='h-8 w-8 rounded-full' src={user.image} alt={user.fullname} />
                            <span className='ml-2'>{user.fullname}</span>
                            <button className='ml-auto bg-green-500 text-white px-2 py-1 rounded text-sm' onClick={()=>addCollab(user._id)}>Add</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchUserForm;