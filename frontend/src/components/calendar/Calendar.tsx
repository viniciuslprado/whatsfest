
import React, { useState, useMemo } from 'react';
import DayEventsModal from '../modals/DayEventsModal';
import CalendarHeader from './CalendarHeader';
import CalendarWeekDays from './CalendarWeekDays';
import CalendarDay from './CalendarDay';
import { filterFestasDoMes, filterFestasDoDia } from '../filters/festaFilters';
import type { Festa } from '../../lib/api';

interface CalendarProps {
  festas?: Festa[];
}
const Calendar: React.FC<CalendarProps> = ({ festas = [] }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<Festa[]>([]);

  // Filtra eventos do mês atual
  const festasDoMes = useMemo(() => filterFestasDoMes(festas, currentDate), [festas, currentDate]);

  const getDaysInMonth = (date: Date): number => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date): number => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const goToPreviousMonth = () => setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  const goToNextMonth = () => setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));

  const handleDayClick = (day: number, eventos: Festa[]) => {
    if (eventos.length > 0) {
      const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(clickedDate);
      setSelectedDayEvents(eventos);
    }
  };
  const handleCloseDayModal = () => {
    setSelectedDate(null);
    setSelectedDayEvents([]);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
  const days: React.ReactNode[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="border border-gray-100 bg-gray-50 rounded-xl min-h-[48px]" />
      );
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const festasDoDia = filterFestasDoDia(festasDoMes, day);
      days.push(
        <CalendarDay
          key={day}
          day={day}
          festasDoDia={festasDoDia}
          onClick={handleDayClick}
        />
      );
    }
    return days;
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden my-8 border border-gray-200">
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
        />
        <div className="p-2 sm:p-6">
          <CalendarWeekDays />
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>
        </div>
      </div>
      <DayEventsModal
        selectedDate={selectedDate}
        eventos={selectedDayEvents}
        onClose={handleCloseDayModal}
      />
    </>
  );
};

export default Calendar;