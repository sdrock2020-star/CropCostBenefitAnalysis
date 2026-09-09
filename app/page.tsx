'use client';

import React, { useState } from 'react';
import { ApmcMarketTable } from '@/components/ApmcMarketTable';
import { LayoutDashboard, Calculator, Sprout } from 'lucide-react';

export default function Home() {
  // Page toggle: 'market' (Page 1) or 'calculator' (Page 2)
  const [currentPage, setCurrentPage] = useState<'market' | 'calculator'>('market');
  const [activeTab, setActiveTab] = useState<'about' | 'contact' | 'research' | 'copyright'>('about');

  return (
    <div 
      className="min-h-screen text-stone-800 font-sans pb-12 relative bg-cover bg-center bg-fixed flex flex-col"
      style={{ 
        backgroundImage: `linear-gradient(rgba(245, 245, 240, 0.92), rgba(245, 245, 240, 0.92)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop')` 
      }}
    >
      {/* 1. INSTITUTIONAL HEADER BANNER */}
      <header className="bg-white/95 backdrop-blur-md border-b-4 border-green-700 px-6 py-4 shadow-md sticky top-0 z-20 w-full">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-2">
          
          {/* ICAR Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/icar.png" 
              alt="ICAR Logo" 
              className="h-20 md:h-24 w-auto object-contain drop-shadow-sm" 
            />
          </div>

          {/* Centered Main Titles */}
          <div className="text-center flex-1 max-w-4xl mx-auto">
            <p className="text-xs md:text-sm font-extrabold text-green-800 uppercase tracking-widest">
              Rejuvenating Watersheds for Agricultural Resilience Through Innovative Development
            </p>
            <div className="flex items-center justify-center gap-3 mt-1">
              <h1 className="text-2xl md:text-4xl font-black text-green-700 tracking-tight uppercase">
                Cost benefit Analysis of Crops
              </h1>
              <span className="text-3xl select-none">🍀</span>
            </div>
          </div>

          {/* REWARD / IIWM Logo & Meta */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right hidden xl:block">
              <span className="text-sm font-black text-stone-800 block uppercase tracking-wider">REWARD Project</span>
              <span className="text-[11px] text-stone-500 font-bold block">ICAR - IIWM Bhubaneswar</span>
            </div>
            <img 
              src="/he.png" 
              alt="REWARD / IIWM Logo" 
              className="h-20 md:h-24 w-auto object-contain drop-shadow-sm" 
            />
          </div>

        </div>

        {/* 2-PAGE TOGGLE BAR */}
        <div className="flex justify-center mt-3 pt-2 border-t border-stone-200">
          <div className="bg-stone-100 p-1.5 rounded-xl flex items-center gap-2 border border-stone-300 shadow-inner">
            <button
              onClick={() => setCurrentPage('market')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                currentPage === 'market'
                  ? 'bg-green-700 text-white shadow-md scale-[1.02]'
                  : 'text-stone-600 hover:text-green-800 hover:bg-stone-200/70'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Page 1: APMC Live Feed
            </button>

            <button
              onClick={() => setCurrentPage('calculator')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                currentPage === 'calculator'
                  ? 'bg-green-700 text-white shadow-md scale-[1.02]'
                  : 'text-stone-600 hover:text-green-800 hover:bg-stone-200/70'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Page 2: Crop Cost Analysis
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT VIEW CONTROLLER */}
      <main className="w-full max-w-[98vw] mx-auto px-2 md:px-4 py-6 flex-1">
        
        {/* PAGE 1: APMC MARKET TABLE + IMAGES */}
        {currentPage === 'market' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch h-full">
            <div className="xl:col-span-7 flex flex-col">
              <div className="h-full w-full flex flex-col [&>div]:h-full [&>div]:w-full">
                <ApmcMarketTable />
              </div>
            </div>

            <div className="xl:col-span-5 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-stone-200/90 shadow-lg flex flex-col justify-between h-full">
              <div className="border-b border-stone-200 pb-2.5">
                <h4 className="font-extrabold text-green-900 text-sm tracking-wide uppercase">
                  CROPS & APMC DATA
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Real-time agricultural Crop Data by OGD Data GOV.
                </p>
              </div>

              <div className="w-full flex-1 min-h-[220px] my-3 rounded-xl overflow-hidden shadow-inner border border-stone-100 bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1000&auto=format&fit=crop"
                  alt="Watershed Crop Farming"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="h-32 sm:h-36 rounded-xl overflow-hidden shadow-inner border border-stone-100 bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop"
                    alt="Odisha Paddy & Field"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="h-32 sm:h-36 rounded-xl overflow-hidden shadow-inner border border-stone-100 bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"
                    alt="Harvest & Market Crops"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2: CLEAN PLACEHOLDER FOR COST BENEFIT DROPDOWNS */}
        {currentPage === 'calculator' && (
          <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-lg p-8 min-h-[550px] flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <Sprout className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-green-900 uppercase tracking-tight">
              Crop Cost Benefit Analysis Calculator
            </h3>
          </div>
        )}

      </main>

      {/* 3. INSTITUTIONAL FOOTER SECTION */}
      <footer className="mt-8 pt-6 border-t border-stone-300/80 text-center space-y-4">
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
                Bhubaneswar, Odisha, India
              </p>
            </div>
          )}

          {activeTab === 'research' && (
            <div className="space-y-2 text-left sm:text-center">
              <h5 className="font-extrabold text-green-800 text-sm text-center">REWARD Project Research & Development Team</h5>
              <p className="text-xs text-stone-600 text-center">
                Developed under the guidance of Principal Investigator (P.I.)
              </p>
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
