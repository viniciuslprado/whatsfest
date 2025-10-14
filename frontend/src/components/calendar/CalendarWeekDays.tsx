import React from 'react';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const CalendarWeekDays: React.FC = () => (
  <div className="grid grid-cols-7 gap-1 mb-1">
    {daysOfWeek.map((day) => (
      <div
        key={day}
        className="py-2 text-center text-xs font-bold text-gray-600 bg-gray-100 rounded-lg tracking-tight uppercase"
      >
        {day}
      </div>
    ))}
  </div>
);

export default CalendarWeekDays;
