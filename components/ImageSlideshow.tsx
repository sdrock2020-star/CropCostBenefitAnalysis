'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const slideImages = [
  '/hi1.jpeg',
  '/hi2.jpeg',
  '/hi3.jpeg',
  '/hi6.jpg',
  '/hi4.jpg',
  '/hi9.jpg',
  '/hi11.jpeg',
  '/hi19.jpeg',
  '/hi16.jpeg',
  '/hi13.jpeg',
  '/hi12.jpeg',
  
];

export default function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideImages.length);
    }, 2500); // 3 seconds transition

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100">
      {slideImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={src}
            alt={`Agricultural slide ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
        {slideImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-6 h-2 bg-emerald-500'
                : 'w-2 h-2 bg-white/70 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
