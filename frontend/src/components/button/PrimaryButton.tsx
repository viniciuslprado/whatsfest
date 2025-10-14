import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-bold bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md hover:from-purple-600 hover:to-pink-600 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default PrimaryButton;
