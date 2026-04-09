import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isWithinInterval, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, StickyNote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroImage from './HeroImage';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('calendar-notes');
    return saved ? JSON.parse(saved) : {};
  });

  // Persist notes
  useEffect(() => {
    localStorage.setItem('calendar-notes', JSON.stringify(notes));
  }, [notes]);

  const handleDateClick = (date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (selectedStartDate && !selectedEndDate) {
      if (date < selectedStartDate) {
        setSelectedStartDate(date);
      } else {
        setSelectedEndDate(date);
      }
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const addNote = (dateStr, text) => {
    setNotes(prev => ({
      ...prev,
      [dateStr]: text
    }));
  };

  const deleteNote = (dateStr) => {
    const newNotes = { ...notes };
    delete newNotes[dateStr];
    setNotes(newNotes);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left/Top Side: Hero & Calendar */}
        <div className="flex-1 w-full bg-white rounded-3xl overflow-hidden wall-calendar-shadow transition-all duration-500">
          <HeroImage currentMonth={currentMonth} />
          
          <div className="p-6 md:p-10">
            <CalendarHeader 
              currentMonth={currentMonth} 
              onPrev={prevMonth} 
              onNext={nextMonth} 
            />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMonth.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CalendarGrid 
                  currentMonth={currentMonth}
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                  onDateClick={handleDateClick}
                  notes={notes}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right/Bottom Side: Notes */}
        <div className="w-full lg:w-96 shrink-0">
          <NotesPanel 
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            notes={notes}
            onAddNote={addNote}
            onDeleteNote={deleteNote}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
