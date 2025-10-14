import React from 'react';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-bold bg-gradient-to-br from-purple-200 via-blue-100 to-blue-300 text-white border-none shadow-sm hover:from-purple-400 hover:via-blue-200 hover:to-blue-400 hover:shadow-md transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default SecondaryButton;
