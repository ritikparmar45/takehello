import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarHeader = ({ currentMonth, onPrev, onNext }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-display font-semibold text-slate-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={onPrev}
          className="p-2 rounded-full hover:bg-zinc-100 transition-colors border border-zinc-200"
          aria-label="Previous Month"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <button 
          onClick={onNext}
          className="p-2 rounded-full hover:bg-zinc-100 transition-colors border border-zinc-200"
          aria-label="Next Month"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
