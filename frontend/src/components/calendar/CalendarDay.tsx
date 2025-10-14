import React from 'react';
import type { Festa } from '../../lib/api';

interface CalendarDayProps {
  day: number;
  festasDoDia: Festa[];
  onClick: (day: number, festasDoDia: Festa[]) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, festasDoDia, onClick }) => {
  const hasEvent = festasDoDia.length > 0;
  const eventBg = hasEvent ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-200';

  return (
    <button
      type="button"
      className={`relative flex flex-col items-center justify-center rounded-lg min-h-[44px] aspect-square select-none transition cursor-pointer border ${eventBg} hover:brightness-105 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200`}
      onClick={() => onClick(day, festasDoDia)}
    >
      <span className={`font-bold text-base leading-none ${hasEvent ? 'text-purple-800' : 'text-gray-700'} flex items-center justify-center`}>{day}</span>
      {hasEvent && (
        <div className="hidden sm:flex flex-col items-center mt-1 w-full gap-1">
          {festasDoDia.map((festa, idx) => (
            <span
              key={idx}
              className="text-xs text-purple-900 font-semibold truncate w-full text-center bg-purple-100 border border-purple-200 rounded-md px-1 py-0.5"
              title={festa.nome}
            >
              {festa.nome}
            </span>
          ))}
        </div>
      )}
    </button>
  );
};

export default CalendarDay;
