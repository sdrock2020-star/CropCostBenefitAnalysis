'use client';

import React from 'react';
import { Globe, Download, Sprout } from 'lucide-react';
import { useCalculatorStore } from '../store/useCalculatorStore';

export const Header: React.FC = () => {
  const { selectedLanguage, setLanguage, getGrandTotalCost } = useCalculatorStore();

  return (
    <header className="bg-emerald-900 text-white border-b-4 border-amber-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Branding & Title */}
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg text-emerald-900 shadow">
            <Sprout className="w-8 h-8 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded">
                ICAR - IIWM Portal
              </span>
              <span className="text-xs text-amber-300 font-medium">Bhubaneswar, Odisha</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              Cost Benefit Analysis of Crops
            </h1>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Total Cost Badge */}
          <div className="bg-emerald-800/80 border border-emerald-700 px-3 py-1.5 rounded-md text-right">
            <div className="text-[10px] uppercase text-emerald-300 font-medium">Est. Production Cost</div>
            <div className="text-lg font-extrabold text-amber-400">
              ₹ {getGrandTotalCost().toLocaleString('en-IN')}
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-emerald-950 rounded-md p-1 border border-emerald-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1 mr-2" />
            <button
              onClick={() => setLanguage('EN')}
              className={`px-2 py-1 text-xs font-medium rounded ${
                selectedLanguage === 'EN' ? 'bg-amber-500 text-slate-900 font-bold' : 'text-emerald-200 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('OR')}
              className={`px-2 py-1 text-xs font-medium rounded ${
                selectedLanguage === 'OR' ? 'bg-amber-500 text-slate-900 font-bold' : 'text-emerald-200 hover:text-white'
              }`}
            >
              ଓଡ଼ିଆ
            </button>
            <button
              onClick={() => setLanguage('HI')}
              className={`px-2 py-1 text-xs font-medium rounded ${
                selectedLanguage === 'HI' ? 'bg-amber-500 text-slate-900 font-bold' : 'text-emerald-200 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Action Buttons */}
          <button className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 px-3 py-2 rounded-md font-semibold text-xs shadow transition">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>

      </div>
    </header>
  );
};