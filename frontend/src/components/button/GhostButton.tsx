import React from 'react';

interface GhostButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

const GhostButton: React.FC<GhostButtonProps> = ({ children, className = '', active = false, ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-semibold border border-transparent bg-transparent transition-all duration-200
      ${active ? 'bg-purple-100/80 text-purple-800 shadow-inner' : 'text-purple-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-900'}
      focus:outline-none focus:ring-2 focus:ring-purple-300/60
      ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default GhostButton;
