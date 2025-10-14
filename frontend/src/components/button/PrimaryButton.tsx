import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white shadow-md hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default PrimaryButton;
