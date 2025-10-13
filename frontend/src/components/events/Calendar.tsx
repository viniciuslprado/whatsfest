import { useState, useMemo } from 'react';
import DayEventsModal from '../modals/DayEventsModal';
import type { Festa } from '../../lib/api';

interface CalendarProps {
  festas?: Festa[];
}

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];


const Calendar: React.FC<CalendarProps> = ({ festas = [] }) => {
  // Debug: verifique se festas está vindo corretamente
  console.log('Festas recebidas pelo Calendar:', festas);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<Festa[]>([]);

  // Filtra eventos do mês atual
  const festasDoMes = useMemo(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    return festas.filter((festa) => {
      if (!festa.data) return false;
      const dataFesta = new Date(festa.data);
      return dataFesta.getMonth() === currentMonth && dataFesta.getFullYear() === currentYear;
    });
  }, [festas, currentDate]);

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
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="border border-gray-100 bg-gray-50 rounded-xl min-h-[48px]" />
      );
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const today = new Date();
      const isToday =
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      const festasDoDia = festasDoMes.filter((festa) => {
        if (!festa.data) return false;
        const dataFesta = new Date(festa.data);
        return dataFesta.getDate() === day;
      });
      const hasEvent = festasDoDia.length > 0;
      days.push(
        <button
          key={day}
          type="button"
          className={`flex flex-col items-center justify-center rounded-lg min-h-[44px] aspect-square select-none transition cursor-pointer border
            ${isToday ? 'border-blue-500 bg-blue-100 shadow-lg ring-2 ring-blue-300' : hasEvent ? 'border-pink-400 bg-pink-100 shadow' : 'border-gray-200 bg-gray-50'}
            hover:bg-blue-200 hover:border-blue-400 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400`}
          onClick={() => handleDayClick(day, festasDoDia)}
        >
          <span className={`font-bold text-base leading-none ${isToday ? 'text-blue-800' : hasEvent ? 'text-pink-700' : 'text-gray-700'}`}>{day}</span>
          {hasEvent && (
            <span className="mt-1 text-xs font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full px-2 py-0.5 shadow border border-white/70">
              {festasDoDia.length} evento{festasDoDia.length > 1 ? 's' : ''}
            </span>
          )}
        </button>
      );
    }
    return days;
  };

  return (
    <>
  <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden my-8 border border-gray-200">
  <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-3 flex items-center justify-between px-2 sm:px-8">
          <button onClick={goToPreviousMonth} className="rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-2xl w-11 h-11 flex items-center justify-center transition-all">
            &#8592;
          </button>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center tracking-tight drop-shadow-lg">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button onClick={goToNextMonth} className="rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-2xl w-11 h-11 flex items-center justify-center transition-all">
            &#8594;
          </button>
        </div>
        <div className="p-2 sm:p-6">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-2 text-center text-xs font-bold text-gray-600 bg-gray-100 rounded-lg tracking-tight uppercase">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>
        </div>
      </div>
      <DayEventsModal
        selectedDate={selectedDate}
        eventos={selectedDayEvents}
        onClose={handleCloseDayModal}
        onEventClick={() => {}}
      />
    </>
  );
};

export default Calendar;