import FlyerCarousel from '../components/Flyer/FlyerCarousel';
import EventFilters from '../components/filters/EventFilters';
import Calendar from '../components/calendar/Calendar';
import type { Festa } from '../lib/api';
import type { FilterState } from '../components/filters/EventFilters';

interface InicioProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  festas: Festa[];
}

const Inicio: React.FC<InicioProps> = ({ filters, onFiltersChange, festas }) => (
  <div style={{ padding: '20px 10px' }}>
    <FlyerCarousel />
    <EventFilters filters={filters} onFiltersChange={onFiltersChange} />
    <Calendar festas={festas} />
  </div>
);

export default Inicio;
