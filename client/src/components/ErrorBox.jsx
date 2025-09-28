import React, { useEffect, useState } from 'react';

const ErrorBox = ({ error, duration = 4000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);

      // Hide after duration
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose(); // notify parent
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [error, duration, onClose]);

  if (!error) return null;

  return (
    <div
      className={`fixed z-99 top-10 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
      }`}
    >
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 shadow-lg rounded-lg flex items-center gap-2">
        <span>❌</span>
        <p className='poppins'>{error}</p>
      </div>
    </div>
  );
};

export default ErrorBox;