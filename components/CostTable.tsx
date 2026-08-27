'use client';

import React from 'react';
import { useCalculatorStore } from '../store/useCalculatorStore';

export const CostTable: React.FC = () => {
  const { stages, activeStageId, updateUnitPrice, landAreaAcre, getStageTotal } = useCalculatorStore();
  const currentStage = stages.find((s) => s.stageId === activeStageId) || stages[0];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      {/* Stage Title Header */}
      <div className="bg-slate-900 text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-amber-400">{currentStage.stageName}</h3>
          <p className="text-xs text-slate-300 mt-0.5">{currentStage.description}</p>
        </div>
        <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-right">
          <div className="text-[10px] uppercase text-slate-400">Stage Total ({landAreaAcre} Acre)</div>
          <div className="text-base font-extrabold text-amber-400">
            ₹ {getStageTotal(currentStage.stageId).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Interactive Activity Cost Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-4 font-bold">Activity / Input Item</th>
              <th className="py-3 px-4 font-bold">Category</th>
              <th className="py-3 px-4 font-bold text-center">Req. Qty / Acre</th>
              <th className="py-3 px-4 font-bold text-center">Unit</th>
              <th className="py-3 px-4 font-bold text-right">Unit Rate (₹)</th>
              <th className="py-3 px-4 font-bold text-right">Total Cost ({landAreaAcre} Acre)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {currentStage.activities.map((act) => {
              const totalCost = act.standardQty * act.userUnitPrice * landAreaAcre;
              const isModified = act.userUnitPrice !== act.defaultUnitPrice;

              return (
                <tr key={act.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    {act.activityName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-slate-200 text-slate-700">
                      {act.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                    {(act.standardQty * landAreaAcre).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500 text-xs">
                    {act.unit}
                  </td>
                  
                  {/* Editable Rate Field */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-300 rounded px-2 py-1 focus-within:ring-2 focus-within:ring-amber-500">
                      <span className="text-slate-500 font-semibold text-xs">₹</span>
                      <input
                        type="number"
                        min="0"
                        value={act.userUnitPrice}
                        onChange={(e) => updateUnitPrice(currentStage.stageId, act.id, parseFloat(e.target.value) || 0)}
                        className="w-20 text-right bg-transparent font-bold text-slate-900 focus:outline-none text-sm"
                      />
                    </div>
                    {isModified && (
                      <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
                        Default: ₹{act.defaultUnitPrice}
                      </div>
                    )}
                  </td>

                  {/* Calculated Subtotal */}
                  <td className="py-3.5 px-4 text-right font-extrabold text-slate-900">
                    ₹ {totalCost.toLocaleString('en-IN')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};