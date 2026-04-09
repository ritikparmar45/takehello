import React from 'react';
import { format } from 'date-fns';

const monthlyImages = {
  0: "https://images.unsplash.com/photo-1483366759019-b5df7e60738c?auto=format&fit=crop&q=80&w=1200", // Jan - Winter
  1: "https://images.unsplash.com/photo-1544239649-4238bf2933ce?auto=format&fit=crop&q=80&w=1200", // Feb - Late Winter/Valentine
  2: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1200", // Mar - Spring
  3: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&q=80&w=1200", // Apr - Blossoms
  4: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200", // May - Mountains/Green
  5: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200", // Jun - Beach/Summer
  6: "https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=1200", // Jul - Summer
  7: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=1200", // Aug - Golden Hour
  8: "https://images.unsplash.com/photo-1474433188271-d3f339f41911?auto=format&fit=crop&q=80&w=1200", // Sep - Autumn Start
  9: "https://images.unsplash.com/photo-1507724539893-06a646545196?auto=format&fit=crop&q=80&w=1200", // Oct - Halloween/Deep Autumn
  10: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200", // Nov - Cozy/City
  11: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&q=80&w=1200", // Dec - Festive/Snow
};

const HeroImage = ({ currentMonth }) => {
  const monthIndex = currentMonth.getMonth();
  const imageUrl = monthlyImages[monthIndex];

  return (
    <div className="relative h-64 md:h-80 w-full overflow-hidden group">
      <img 
        src={imageUrl} 
        alt={format(currentMonth, 'MMMM')}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Wall Calendar "Hole" Decorative Element */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4">
        <div className="w-4 h-4 rounded-full bg-zinc-800 shadow-inner border border-zinc-700/50" />
      </div>

      {/* Overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      {/* Month Year Floating Badge */}
      <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
          {format(currentMonth, 'MMMM')}
        </h1>
        <p className="text-xl md:text-2xl font-light opacity-90">
          {format(currentMonth, 'yyyy')}
        </p>
      </div>
    </div>
  );
};

export default HeroImage;
