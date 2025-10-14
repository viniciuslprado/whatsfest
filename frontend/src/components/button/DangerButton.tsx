import React from 'react';

interface DangerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DangerButton: React.FC<DangerButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-bold bg-red-600 text-white shadow hover:bg-red-700 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default DangerButton;
