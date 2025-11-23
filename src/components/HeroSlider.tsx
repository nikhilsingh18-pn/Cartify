import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80',
    title: 'Big Saving Days',
    subtitle: 'Sale is Live Now',
    color: 'text-white'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556656793-02715d8dd660?auto=format&fit=crop&w=1600&q=80',
    title: 'Electronics Sale',
    subtitle: 'Up to 40% Off',
    color: 'text-white'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
    title: 'Fashion Trends',
    subtitle: 'New Arrivals',
    color: 'text-gray-900'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80',
    title: 'Music & Audio',
    subtitle: 'Immersive Experience',
    color: 'text-white'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80',
    title: 'Sneaker Fest',
    subtitle: 'Walk in Style',
    color: 'text-white'
  }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const HeroSlider: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([(page + newDirection + slides.length) % slides.length, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [page]);

  return (
    <div className="relative w-full h-48 md:h-80 bg-gray-900 overflow-hidden my-4 rounded-2xl shadow-lg group border border-gray-800">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full"
        >
          <img
            src={slides[page].image}
            alt={slides[page].title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent flex items-center justify-center">
             <div className="text-center transform translate-y-4">
                <h2 className={`text-3xl md:text-5xl font-black mb-2 ${slides[page].color} drop-shadow-2xl tracking-tight`}>{slides[page].title}</h2>
                <p className={`text-xl md:text-2xl font-bold ${slides[page].color} drop-shadow-lg bg-primary/20 px-4 py-1 rounded-full inline-block backdrop-blur-sm`}>{slides[page].subtitle}</p>
             </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-2 cursor-pointer hover:bg-white/30 z-10 transition-all border border-white/20 text-white"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="w-6 h-6" />
      </div>
      <div
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-2 cursor-pointer hover:bg-white/30 z-10 transition-all border border-white/20 text-white"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="w-6 h-6" />
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition-all ${
              i === page ? 'bg-accent scale-125 shadow-[0_0_10px_rgba(0,255,204,0.8)]' : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => setPage([i, i > page ? 1 : -1])}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
