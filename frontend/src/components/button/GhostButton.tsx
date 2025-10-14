import React from 'react';

interface GhostButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

const GhostButton: React.FC<GhostButtonProps> = ({ children, className = '', active = false, ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-semibold bg-transparent text-white border border-transparent transition-all duration-200
      ${active ? 'bg-purple-200/20 shadow-[0_0_0_2px_rgba(168,85,247,0.25)]' : 'hover:shadow-[0_2px_12px_0_rgba(168,85,247,0.25)]'}
      focus:outline-none focus:ring-2 focus:ring-purple-300/60
      ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default GhostButton;
