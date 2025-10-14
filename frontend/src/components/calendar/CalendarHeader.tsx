import React from 'react';
import SecondaryButton from '../button/SecondaryButton';

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onPreviousMonth, onNextMonth }) => (
  <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white py-4 flex items-center justify-between px-2 sm:px-8">
    <SecondaryButton onClick={onPreviousMonth} className="rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-2xl w-11 h-11 flex items-center justify-center transition-all">
      &#8592;
    </SecondaryButton>
    <h2 className="text-2xl sm:text-4xl font-extrabold text-center tracking-tight drop-shadow-lg text-white">
      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
    </h2>
    <SecondaryButton onClick={onNextMonth} className="rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-2xl w-11 h-11 flex items-center justify-center transition-all">
      &#8594;
    </SecondaryButton>
  </div>
);

export default CalendarHeader;
