import React from 'react';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-bold bg-white text-purple-700 border border-purple-300 shadow hover:bg-purple-50 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default SecondaryButton;
