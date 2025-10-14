import type { Festa } from '../../lib/api';

export function filterFestasDoMes(festas: Festa[], currentDate: Date): Festa[] {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  return festas.filter((festa) => {
    if (!festa.data) return false;
    const dataFesta = new Date(festa.data);
    return dataFesta.getMonth() === currentMonth && dataFesta.getFullYear() === currentYear;
  });
}

export function filterFestasDoDia(festas: Festa[], day: number): Festa[] {
  return festas.filter((festa) => {
    if (!festa.data) return false;
    const dataFesta = new Date(festa.data);
    return dataFesta.getDate() === day;
  });
}
