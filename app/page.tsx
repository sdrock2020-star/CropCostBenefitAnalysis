'use client';

import React, { useState } from 'react';
import { ApmcMarketTable } from '@/components/ApmcMarketTable';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'about' | 'contact' | 'research' | 'copyright'>('about');

  return (
    <div 
      className="min-h-screen text-stone-800 font-sans pb-12 relative bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: `linear-gradient(rgba(245, 245, 240, 0.90), rgba(245, 245, 240, 0.90)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop')` 
      }}
    >
      
      {/* 1. INSTITUTIONAL HEADER BANNER (FULL WIDTH & CENTERED) */}
      <header className="bg-white/95 backdrop-blur-md border-b-4 border-green-700 px-8 py-6 shadow-md sticky top-0 z-20 w-full">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 px-4">
          
          {/* ICAR Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/icar.png" 
              alt="ICAR Logo" 
              className="h-24 md:h-28 w-auto object-contain drop-shadow-sm"
            />
          </div>

          {/* Centered Main Titles */}
          <div className="text-center flex-1 max-w-4xl mx-auto">
            <p className="text-xs md:text-sm font-extrabold text-green-800 uppercase tracking-widest">
              Rejuvenating Watersheds for Agricultural Resilience Through Innovative Development
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-green-700 tracking-tight mt-1.5 uppercase">
              Cost benefit Analysis of Crops🍀
            </h1>
          </div>

          {/* REWARD / IIWM Logo & Meta */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right hidden xl:block">
              <span className="text-base font-black text-stone-800 block uppercase tracking-wider">REWARD Project</span>
              <span className="text-xs text-stone-500 font-bold block">ICAR - IIWM Bhubaneswar</span>
            </div>
            <img 
              src="/he.png" 
              alt="REWARD / IIWM Logo" 
              className="h-24 md:h-28 w-auto object-contain drop-shadow-sm"
            />
          </div>

        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ApmcMarketTable />
      </main>

      {/* 3. INSTITUTIONAL FOOTER SECTION */}
      <footer className="mt-12 pt-6 border-t border-stone-300/80 text-center space-y-4">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveTab('about')}
            className={`text-xs px-5 py-2 rounded-full font-bold transition-all shadow-sm ${
              activeTab === 'about'
                ? 'bg-green-700 text-white shadow'
                : 'bg-white/90 hover:bg-white text-stone-700 border border-stone-300'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`text-xs px-5 py-2 rounded-full font-bold transition-all shadow-sm ${
              activeTab === 'contact'
                ? 'bg-green-700 text-white shadow'
                : 'bg-white/90 hover:bg-white text-stone-700 border border-stone-300'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`text-xs px-5 py-2 rounded-full font-bold transition-all shadow-sm ${
              activeTab === 'research'
                ? 'bg-green-700 text-white shadow'
                : 'bg-white/90 hover:bg-white text-stone-700 border border-stone-300'
            }`}
          >
            Research Team
          </button>

          <button
            onClick={() => setActiveTab('copyright')}
            className={`text-xs px-5 py-2 rounded-full font-bold transition-all shadow-sm ${
              activeTab === 'copyright'
                ? 'bg-green-700 text-white shadow'
                : 'bg-white/90 hover:bg-white text-stone-700 border border-stone-300'
            }`}
          >
            Copyright
          </button>
        </div>

        <div className="max-w-3xl mx-auto text-stone-700 text-xs bg-white/90 backdrop-blur-md p-5 rounded-xl border border-stone-200/90 shadow-md transition-all">
          {activeTab === 'about' && (
            <div className="space-y-2">
              <h5 className="font-extrabold text-green-800 text-sm">About ICAR-IIWM</h5>
              <p className="text-xs leading-relaxed text-stone-600">
                The ICAR-Indian Institute of Water Management (IIWM) was established on 12th May 1988 to develop improved water management technologies for sustainable agricultural production.
              </p>
              <p className="text-[11px] text-stone-500 font-medium pt-1">
                <strong>REWARD Project:</strong> World Bank funded initiative for watershed rejuvenation and agricultural resilience through innovative water management solutions.
              </p>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-2">
              <h5 className="font-extrabold text-green-800 text-sm">Contact Information</h5>
              <p className="text-xs text-stone-600 font-semibold">
                ICAR - Indian Institute of Water Management (IIWM)
              </p>
              <p className="text-xs text-stone-600">

              </p>
              <div className="flex flex-wrap justify-center gap-4 text-[11px] text-stone-500 font-semibold pt-1">
              </div>
            </div>
          )}

          {activeTab === 'research' && (
            <div className="space-y-2 text-left sm:text-center">
              <h5 className="font-extrabold text-green-800 text-sm text-center">REWARD Project Research & Development Team</h5>
              <p className="text-xs text-stone-600 text-center">
                Developed under the guidance of Principal Investigator (P.I.)
              </p>
              <div className="text-[11px] text-stone-600 font-medium pt-2 space-y-1 inline-block text-left">
              </div>
            </div>
          )}

          {activeTab === 'copyright' && (
            <div className="space-y-2">
              <h5 className="font-extrabold text-green-800 text-sm">Copyright & Licensing</h5>
              <p className="text-xs text-stone-600 font-semibold">
                © 2026 ICAR - Indian Institute of Water Management (IIWM), Bhubaneswar. All Rights Reserved.
              </p>
            </div>
          )}
        </div>
      </footer>

    </div>
  );
}
