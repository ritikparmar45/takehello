import React, { useState } from 'react';
import { format, isSameDay, eachDayOfInterval } from 'date-fns';
import { StickyNote, Trash2, Plus, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './Calendar';

const NotesPanel = ({ selectedStartDate, selectedEndDate, notes, onAddNote, onDeleteNote }) => {
  const [noteText, setNoteText] = useState('');

  const activeDate = selectedStartDate;
  const activeDateStr = activeDate ? format(activeDate, 'yyyy-MM-dd') : null;
  const isRange = selectedStartDate && selectedEndDate;
  
  const handleAdd = () => {
    if (!noteText.trim() || !activeDateStr) return;
    onAddNote(activeDateStr, noteText);
    setNoteText('');
  };

  const getDayNotes = () => {
    if (!selectedStartDate) return [];
    if (!selectedEndDate) {
      const note = notes[format(selectedStartDate, 'yyyy-MM-dd')];
      return note ? [{ date: selectedStartDate, text: note }] : [];
    }
    
    // For range, find all notes in interval
    const interval = eachDayOfInterval({ start: selectedStartDate, end: selectedEndDate });
    return interval
      .map(date => ({ date, text: notes[format(date, 'yyyy-MM-dd')] }))
      .filter(item => item.text);
  };

  const currentNotes = getDayNotes();

  return (
    <div className="glass-card rounded-3xl p-6 h-full min-h-[400px] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-xl">
          <StickyNote className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-display font-bold text-slate-800">My Notes</h3>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        {selectedStartDate ? (
          <>
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
              <div className="flex items-center gap-2 mb-3 text-sm font-medium text-slate-500">
                <CalendarIcon className="w-4 h-4" />
                <span>
                  {isRange 
                    ? `${format(selectedStartDate, 'MMM d')} - ${format(selectedEndDate, 'MMM d')}`
                    : format(selectedStartDate, 'MMMM do, yyyy')
                  }
                </span>
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="What's happening?"
                  className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button 
                  onClick={handleAdd}
                  disabled={!noteText.trim()}
                  className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {currentNotes.length > 0 ? (
                  currentNotes.map((note, idx) => (
                    <motion.div
                      key={format(note.date, 'yyyy-MM-dd') + idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group flex items-start gap-4 p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">
                          {note.text}
                        </p>
                        <div className="flex items-center gap-1.5 mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          <Clock className="w-3 h-3" />
                          {format(note.date, 'MMM d')}
                        </div>
                      </div>
                      <button 
                        onClick={() => onDeleteNote(format(note.date, 'yyyy-MM-dd'))}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <div className="bg-zinc-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
                      <StickyNote className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-zinc-400 font-medium">No notes for this {isRange ? 'range' : 'date'}</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <CalendarIcon className="w-8 h-8 text-blue-200" />
            </div>
            <p className="text-slate-400 font-medium max-w-[180px]">
              Select a date on the calendar to see or add notes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPanel;
