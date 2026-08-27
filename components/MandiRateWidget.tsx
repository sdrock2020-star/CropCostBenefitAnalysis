'use client';

import React, { useState } from 'react';
import { useCalculatorStore } from '../store/useCalculatorStore';
import { Store, Calculator } from 'lucide-react';

export const MandiRateWidget: React.FC = () => {
  const { selectedCrop, selectedDistrict, getGrandTotalCost, landAreaAcre } = useCalculatorStore();

  // Baseline expected yield (Qtl per acre) and APMC rate defaults
  const [expectedYieldQtl, setExpectedYieldQtl] = useState<number>(22);
  const [modalPricePerQtl, setModalPricePerQtl] = useState<number>(2300);

  const totalProductionCost = getGrandTotalCost();
  const totalYield = expectedYieldQtl * landAreaAcre;
  const expectedRevenue = totalYield * modalPricePerQtl;
  const netProfit = expectedRevenue - totalProductionCost;
  const costPerQuintal = totalYield > 0 ? totalProductionCost / totalYield : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
      {/* 1. APMC Mandi Market Rate Feed Card */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-slate-800 text-base">
              Live APMC Mandi Rate Feed ({selectedDistrict})
            </h3>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
            Live Feed: {selectedCrop}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase border-b border-slate-200">
                <th className="py-2.5 px-3">Mandi / Market</th>
                <th className="py-2.5 px-3">Variety</th>
                <th className="py-2.5 px-3 text-center">Min Price (₹)</th>
                <th className="py-2.5 px-3 text-center">Max Price (₹)</th>
                <th className="py-2.5 px-3 text-right">Modal Rate (₹/Qtl)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-emerald-50/50">
                <td className="py-3 px-3 font-semibold text-slate-800">
                  {selectedDistrict} APMC
                </td>
                <td className="py-3 px-3 text-slate-600">Common Grade A</td>
                <td className="py-3 px-3 text-center font-medium text-slate-700">₹ 2,150</td>
                <td className="py-3 px-3 text-center font-medium text-slate-700">₹ 2,380</td>
                <td className="py-3 px-3 text-right font-bold text-emerald-700 text-base">
                  ₹ {modalPricePerQtl.toLocaleString('en-IN')}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-800">Cuttack Reg. Market</td>
                <td className="py-3 px-3 text-slate-600">Fine Variety</td>
                <td className="py-3 px-3 text-center text-slate-600">₹ 2,200</td>
                <td className="py-3 px-3 text-center text-slate-600">₹ 2,420</td>
                <td className="py-3 px-3 text-right font-bold text-slate-800">₹ 2,350</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Inputs to adjust calculations */}
        <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Est. Yield Per Acre (Quintals)
            </label>
            <input
              type="number"
              value={expectedYieldQtl}
              onChange={(e) => setExpectedYieldQtl(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded p-2 text-sm font-bold focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Target Selling Market Price (₹ / Qtl)
            </label>
            <input
              type="number"
              value={modalPricePerQtl}
              onChange={(e) => setModalPricePerQtl(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded p-2 text-sm font-bold focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* 2. Expected Net Profitability Card */}
      <div className="bg-slate-900 text-white rounded-xl shadow-sm p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-amber-400">Net Profit Calculator</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-300">
              <span>Total Land Area:</span>
              <span className="font-bold text-white">{landAreaAcre} Acre(s)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Total Est. Yield:</span>
              <span className="font-bold text-white">{totalYield} Quintals</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Cost of Production / Qtl:</span>
              <span className="font-bold text-amber-300">₹ {Math.round(costPerQuintal).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Gross Estimated Revenue:</span>
              <span className="font-bold text-emerald-400">₹ {expectedRevenue.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-2">
              <span>Total Production Cost:</span>
              <span className="font-bold text-rose-400">- ₹ {totalProductionCost.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Net Profit Summary */}
        <div className="mt-6 pt-4 border-t border-slate-800 bg-slate-850 p-3 rounded-lg border border-slate-700">
          <div className="text-xs uppercase text-slate-400 font-medium">Estimated Net Margin</div>
          <div className={`text-2xl font-black mt-1 ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            ₹ {netProfit.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {netProfit >= 0 ? 'Profit margin estimated above cultivation expenses.' : 'Cost exceeds expected market revenue.'}
          </p>
        </div>
      </div>

    </div>
  );
};