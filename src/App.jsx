import React from 'react';
import Calendar from './components/Calendar/Calendar';

function App() {
  return (
    <div className="min-h-screen py-12 md:py-24 flex items-center justify-center bg-zinc-50 overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-200 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative">
        <header className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 tracking-tight">
            Premium Wall Calendar
          </h1>
          <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
            Organize your time with elegance. Plan your dates, manage notes, and experience the tactile feel of a physical calendar.
          </p>
        </header>

        <Calendar />

        <footer className="mt-20 text-center text-slate-400 text-sm font-medium pb-12">
          &copy; {new Date().getFullYear()} Minimal Calendar Design &bull; Built with React & Tailwind
        </footer>
      </div>
    </div>
  );
}

export default App;
