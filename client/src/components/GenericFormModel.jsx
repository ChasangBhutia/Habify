import React, { useRef, useEffect, useState } from 'react';

const GenericFormModel = ({
    isOpen,
    setIsOpen,
    title, // Modal title
    fields = [], // [{ name, type, placeholder, options? }]
    initialData = {},
    onSubmit, // function to handle form submit
    submitText = "Submit"
}) => {

    const [formData, setFormData] = useState({});
    const [extraState, setExtraState] = useState({}); // for color picker or special fields
    const modalRef = useRef();

    // populate form with initial data when editing
    useEffect(() => {
        setFormData(initialData || {});
    }, [isOpen]);

    // prevent background scrolling
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);

    // close on outside click
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        else document.removeEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, extraState); // pass extra state for things like color picker
        setFormData({});
        setExtraState({});
        setIsOpen(false);
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex justify-center items-center z-50">
            <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                <h2 className="text-2xl mb-5 text-gray-800 poppins">{title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map(field => (
                        <div key={field.name} className="mb-2">
                            <label className="block text-gray-700 mb-1">{field.label || field.name}</label>

                            {field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.name] || ""}
                                    onChange={handleChange}
                                    className="resize-none w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            ) : field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    value={formData[field.name] || ""}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="" disabled>{field.placeholder}</option>
                                    {field.options?.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            ) : field.type === 'color' ? (
                                <div className="flex gap-3">
                                    {field.options?.map(opt => (
                                        <button
                                            type="button"
                                            key={opt.value}
                                            onClick={() => setExtraState({ [field.name]: opt.value })}
                                            className={`${extraState[field.name] === opt.value ? 'ring-2 ring-blue-400' : ''} h-9 w-9 rounded-full bg-[${opt.value}] border border-gray-300 hover:ring-2 hover:ring-blue-300 transition`}
                                        ></button>
                                    ))}
                                </div>
                            ) : (
                                <input
                                    type={field.type || 'text'}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.name] || ""}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        {submitText}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GenericFormModel;
