import React from 'react';

const SuccessBox = ({ success }) => {


    return (
        <div
            className={`fixed z-99 top-10 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${success ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
                }`}
        >
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 shadow-lg rounded-lg flex items-center gap-3">
                <span>✅</span>
                <div>
                    <p className="font-semibold">Success!</p>
                    <p className="text-sm">
                        {success} 🎉
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SuccessBox;
