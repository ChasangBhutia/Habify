import React, { useRef, useEffect, useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const SubTaskInputForm = ({subTaskId, inputType, setInputType, task, isOpen, setIsOpen }) => {

    const [file, setFile] = useState(null);
    const [comment, setComment] = useState('');
    const heading = inputType === 'comment' ? "Add Comment" : "Upload File";


    const { addNewComment, uploadFile } = useTaskContext();

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
            setInputType('');

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


    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputType === 'comment') {
            addNewComment(subTaskId, comment);
        } else if(inputType === 'file'){
            const formData = new FormData();
            formData.append('file', file);
            uploadFile(subTaskId, formData);
        }else{
            alert("Invalid option")
        }
        setIsOpen(false);
        setInputType('');
    }

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex justify-center items-center z-50">
            <div
                ref={modalRef}
                className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
            >
                <h2 className="text-2xl mb-5 text-gray-800 poppins">{heading}</h2>
                <form onSubmit={handleSubmit}>
                    {inputType === 'comment' ?
                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">{inputType}</label>
                            <textarea
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                name='comment'
                                type="text"
                                rows="5"
                                placeholder="Enter your comment"
                                className="resize-none w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"

                            ></textarea>
                        </div> :
                        <div className='mb-2'>
                            <input type="file" name='file' className='border p-2 rounded' onChange={(e)=>setFile(e.target.files[0])} />
                        </div>
                    }


                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        {heading}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubTaskInputForm;