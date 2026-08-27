'use client';

import React from 'react';
import { useCalculatorStore } from '../store/useCalculatorStore';

export const FilterBar: React.FC = () => {
  const {
    selectedCrop, setCrop,
    selectedMethod, setMethod,
    landAreaAcre, setLandArea,
    selectedDistrict, setDistrict
  } = useCalculatorStore();

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="Paddy (Rice)">🌾 Paddy (Rice)</option>
              <option value="Wheat">🌾 Wheat</option>
              <option value="Maize">🌽 Maize</option>
              <option value="Green Gram (Moong)">🌱 Green Gram (Moong)</option>
              <option value="Tomato">🍅 Tomato</option>
            </select>
          </div>

          {/* Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Cultivation Method
            </label>
            <select
              value={selectedMethod}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="Direct Seeded Rice (DSR)">Direct Seeded Rice (DSR)</option>
              <option value="Transplanted Paddy (Puddled)">Transplanted Paddy (Puddled)</option>
              <option value="System of Rice Intensification (SRI)">SRI Method</option>
              <option value="Drip Irrigated Cultivation">Drip Irrigated</option>
            </select>
          </div>

          {/* Land Area Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Total Land Area
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.1"
                step="0.5"
                value={landAreaAcre}
                onChange={(e) => setLandArea(parseFloat(e.target.value) || 1)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-16"
              />
              <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">
                Acres
              </span>
            </div>
          </div>

          {/* District Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Location / Mandi Market
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="Khordha / Bhubaneswar">Khordha (Bhubaneswar APMC)</option>
              <option value="Cuttack">Cuttack (Chhatrabazar APMC)</option>
              <option value="Puri">Puri (Jatni / Puri Mandi)</option>
              <option value="Bargarh">Bargarh (Bargarh APMC)</option>
              <option value="Sambalpur">Sambalpur (Sambalpur Mandi)</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};