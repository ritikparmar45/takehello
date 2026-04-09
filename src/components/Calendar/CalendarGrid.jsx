import React from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isSameDay, 
  isWithinInterval,
  isToday 
} from 'date-fns';
import { cn } from './Calendar';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid = ({ currentMonth, selectedStartDate, selectedEndDate, onDateClick, notes }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const isInRange = (date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return isWithinInterval(date, { 
      start: selectedStartDate, 
      end: selectedEndDate 
    });
  };

  return (
    <div className="grid grid-cols-7 gap-1 md:gap-2">
      {/* Weekday Headers */}
      {weekdays.map((day) => (
        <div key={day} className="text-center py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
          {day}
        </div>
      ))}

      {/* Days Grid */}
      {days.map((day, dayIdx) => {
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelectedStart = selectedStartDate && isSameDay(day, selectedStartDate);
        const isSelectedEnd = selectedEndDate && isSameDay(day, selectedEndDate);
        const inRange = isInRange(day);
        const today = isToday(day);
        const hasNote = notes[format(day, 'yyyy-MM-dd')];

        return (
          <button
            key={day.toString()}
            onClick={() => onDateClick(day)}
            className={cn(
              "group relative h-16 md:h-24 p-2 transition-all duration-300 rounded-xl flex flex-col items-center justify-center",
              !isCurrentMonth && "opacity-20",
              isCurrentMonth && "hover:bg-zinc-100",
              inRange && !isSelectedStart && !isSelectedEnd && "bg-blue-50/80 rounded-none",
              isSelectedStart && "bg-blue-600 text-white shadow-lg shadow-blue-200 z-10",
              isSelectedEnd && "bg-blue-600 text-white shadow-lg shadow-blue-200 z-10",
              today && !isSelectedStart && !isSelectedEnd && "border-2 border-blue-600/30 font-bold text-blue-600"
            )}
          >
            {/* Selection Connector (Visual for Range) */}
            {inRange && !isSelectedStart && (
              <div className="absolute inset-y-0 -left-1 w-2 bg-blue-50/80 -z-1" />
            )}
            {inRange && !isSelectedEnd && (
              <div className="absolute inset-y-0 -right-1 w-2 bg-blue-50/80 -z-1" />
            )}

            <span className="text-lg md:text-xl font-medium relative z-10">
              {format(day, 'd')}
            </span>

            {/* Note Indicator */}
            {hasNote && (
              <div className={cn(
                "absolute bottom-2 w-1.5 h-1.5 rounded-full",
                (isSelectedStart || isSelectedEnd) ? "bg-white" : "bg-blue-500"
              )} />
            )}
            
            {/* Hover Indicator */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-600/10 transition-colors" />
          </button>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
