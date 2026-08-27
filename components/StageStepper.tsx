'use client';

import React from 'react';
import { useCalculatorStore } from '../store/useCalculatorStore';
import { CheckCircle2 } from 'lucide-react';

export const StageStepper: React.FC = () => {
  const { stages, activeStageId, setActiveStage, getStageTotal, landAreaAcre } = useCalculatorStore();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
        Cultivation Lifecycle Stages ({landAreaAcre} Acre Basis)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {stages.map((stage) => {
          const isActive = stage.stageId === activeStageId;
          const stageTotal = getStageTotal(stage.stageId);

          return (
            <button
              key={stage.stageId}
              onClick={() => setActiveStage(stage.stageId)}
              className={`text-left p-3.5 rounded-lg border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-emerald-50 border-emerald-600 shadow-sm ring-1 ring-emerald-500'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className={`text-sm font-bold ${isActive ? 'text-emerald-900' : 'text-slate-700'}`}>
                  {stage.stageName}
                </span>
                {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
              </div>
              
              <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-2">
                <span className="text-xs text-slate-500 font-medium">Stage Subtotal:</span>
                <span className={`text-sm font-extrabold ${isActive ? 'text-emerald-700' : 'text-slate-800'}`}>
                  ₹ {stageTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
