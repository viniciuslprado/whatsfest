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
      // Lógica normal para todos os dias
      const festasDoDia = festasDoMes.filter((festa) => {
        if (!festa.data) return false;
        const dataFesta = new Date(festa.data);
        return dataFesta.getDate() === day;
      });
      const hasEvent = festasDoDia.length > 0;

      // Fundo gradiente suave para dias com evento
  // Gradiente suavemente mais escuro para melhor contraste
  const gradBg = hasEvent ? 'bg-gradient-to-br from-pink-100 via-blue-100 to-blue-100' : 'bg-gray-50';
      // Sombra colorida sutil para dias com evento
      const shadow = hasEvent ? 'shadow-[0_2px_8px_0_rgba(236,72,153,0.15)]' : '';
      // Badge (bolinha) no canto superior direito (mobile)
      const badge = hasEvent ? (
        <span className="absolute top-1 right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow-sm sm:hidden">
          {festasDoDia.length}
        </span>
      ) : null;

      days.push(
        <button
          key={day}
          type="button"
          className={`relative flex flex-col items-center justify-center rounded-lg min-h-[44px] aspect-square select-none transition cursor-pointer border border-gray-200 ${gradBg} ${shadow}
            hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-pink-100`}
          onClick={() => handleDayClick(day, festasDoDia)}
        >
          {/* Badge no canto superior direito (mobile) */}
          {badge}
          {/* Número do dia */}
          <span className={`font-bold text-base leading-none ${hasEvent ? 'text-pink-700' : 'text-gray-700'} flex items-center justify-center`}>{day}</span>
          {/* Mobile: número de eventos (como antes, para comparação) */}
          {hasEvent && (
            <span className="mt-1 text-xs font-semibold bg-pink-100 text-pink-700 rounded-full px-2 py-0.5 border border-pink-200 sm:hidden">
              {festasDoDia.length} evento{festasDoDia.length > 1 ? 's' : ''}
            </span>
          )}
          {/* Desktop: nomes das festas, um por linha, cada uma em um retângulo cinza claro */}
          {hasEvent && (
            <div className="hidden sm:flex flex-col items-center mt-1 w-full gap-1">
              {festasDoDia.map((festa, idx) => (
                <span
                  key={idx}
                  className="text-xs text-gray-800 font-semibold truncate w-full text-center bg-gray-100 border border-gray-300 rounded-md px-1 py-0.5"
                  title={festa.nome}
                >
                  {festa.nome}
                </span>
              ))}
            </div>
          )}
        </button>
      );
    }
    return days;
  };

  return (
    <>
  <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden my-8 border border-gray-200">
    <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white py-4 flex items-center justify-between px-2 sm:px-8">
      <button onClick={goToPreviousMonth} className="rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-2xl w-11 h-11 flex items-center justify-center transition-all">
        &#8592;
      </button>
      <h2 className="text-2xl sm:text-4xl font-extrabold text-center tracking-tight drop-shadow-lg text-white">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
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
      />
    </>
  );
};

export default Calendar;