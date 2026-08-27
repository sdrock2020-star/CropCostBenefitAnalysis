import { create } from 'zustand';

export interface ActivityCostItem {
  id: string;
  activityName: string;
  category: 'Labor' | 'Machinery' | 'Inputs' | 'Irrigation';
  standardQty: number; // Qty per acre
  unit: string;        // Hours, Mandays, Kg, Bags
  defaultUnitPrice: number;
  userUnitPrice: number;
}

export interface CultivationStage {
  stageId: number;
  stageName: string;
  description: string;
  activities: ActivityCostItem[];
}

interface CalculatorState {
  // Navigation & Selection Filters
  selectedLanguage: 'EN' | 'OR' | 'HI';
  selectedCrop: string;
  selectedMethod: string;
  landAreaAcre: number;
  selectedDistrict: string;
  activeStageId: number;

  // Lifecycle Data
  stages: CultivationStage[];

  // Actions
  setLanguage: (lang: 'EN' | 'OR' | 'HI') => void;
  setCrop: (crop: string) => void;
  setMethod: (method: string) => void;
  setLandArea: (area: number) => void;
  setDistrict: (district: string) => void;
  setActiveStage: (stageId: number) => void;
  updateUnitPrice: (stageId: number, activityId: string, newPrice: number) => void;

  // Derived Calculations
  getStageTotal: (stageId: number) => number;
  getGrandTotalCost: () => number;
}

// Initial Sample Seed Data for Paddy (DSR Method)
const initialStages: CultivationStage[] = [
  {
    stageId: 1,
    stageName: '1. Land Preparation',
    description: 'Dry tillage using disc harrow followed by laser land leveling for uniform seed bed and moisture.',
    activities: [
      { id: 'act-101', activityName: 'Tractor Plowing & Leveling', category: 'Machinery', standardQty: 2, unit: 'Hours', defaultUnitPrice: 900, userUnitPrice: 900 },
      { id: 'act-102', activityName: 'Field Labor (Bund Trimming)', category: 'Labor', standardQty: 3, unit: 'Mandays', defaultUnitPrice: 350, userUnitPrice: 350 },
      { id: 'act-103', activityName: 'FYM / Organic Manure', category: 'Inputs', standardQty: 2, unit: 'Tonnes', defaultUnitPrice: 1200, userUnitPrice: 1200 }
    ]
  },
  {
    stageId: 2,
    stageName: '2. Sowing & Seed Input',
    description: 'Direct seeding using seed-cum-fertilizer drill with recommended seed treatment.',
    activities: [
      { id: 'act-201', activityName: 'HYV Seed (Paddy)', category: 'Inputs', standardQty: 10, unit: 'Kg', defaultUnitPrice: 65, userUnitPrice: 65 },
      { id: 'act-202', activityName: 'Fungicide Seed Treatment', category: 'Inputs', standardQty: 1, unit: 'Pack', defaultUnitPrice: 250, userUnitPrice: 250 },
      { id: 'act-203', activityName: 'Seed Drill Rental', category: 'Machinery', standardQty: 1.5, unit: 'Hours', defaultUnitPrice: 850, userUnitPrice: 850 }
    ]
  },
  {
    stageId: 3,
    stageName: '3. Irrigation & Nutrient Management',
    description: 'Split application of Nitrogen (Urea), DAP, Potash, and micro-irrigation scheduling.',
    activities: [
      { id: 'act-301', activityName: 'Urea (45kg bag)', category: 'Inputs', standardQty: 2, unit: 'Bags', defaultUnitPrice: 266, userUnitPrice: 266 },
      { id: 'act-302', activityName: 'DAP (50kg bag)', category: 'Inputs', standardQty: 1, unit: 'Bags', defaultUnitPrice: 1350, userUnitPrice: 1350 },
      { id: 'act-303', activityName: 'Pump Electricity / Diesel Cost', category: 'Irrigation', standardQty: 15, unit: 'Hours', defaultUnitPrice: 120, userUnitPrice: 120 }
    ]
  }
];

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  selectedLanguage: 'EN',
  selectedCrop: 'Paddy (Rice)',
  selectedMethod: 'Direct Seeded Rice (DSR)',
  landAreaAcre: 1,
  selectedDistrict: 'Khordha / Bhubaneswar',
  activeStageId: 1,
  stages: initialStages,

  setLanguage: (lang) => set({ selectedLanguage: lang }),
  setCrop: (crop) => set({ selectedCrop: crop }),
  setMethod: (method) => set({ selectedMethod: method }),
  setLandArea: (area) => set({ landAreaAcre: area <= 0 ? 1 : area }),
  setDistrict: (district) => set({ selectedDistrict: district }),
  setActiveStage: (stageId) => set({ activeStageId: stageId }),

  updateUnitPrice: (stageId, activityId, newPrice) => set((state) => ({
    stages: state.stages.map((stage) => {
      if (stage.stageId !== stageId) return stage;
      return {
        ...stage,
        activities: stage.activities.map((act) => 
          act.id === activityId ? { ...act, userUnitPrice: newPrice >= 0 ? newPrice : 0 } : act
        )
      };
    })
  })),

  getStageTotal: (stageId) => {
    const { stages, landAreaAcre } = get();
    const stage = stages.find((s) => s.stageId === stageId);
    if (!stage) return 0;
    const costPerAcre = stage.activities.reduce((sum, act) => sum + (act.standardQty * act.userUnitPrice), 0);
    return costPerAcre * landAreaAcre;
  },

  getGrandTotalCost: () => {
    const { stages, landAreaAcre } = get();
    const totalPerAcre = stages.reduce((stageSum, stage) => {
      return stageSum + stage.activities.reduce((actSum, act) => actSum + (act.standardQty * act.userUnitPrice), 0);
    }, 0);
    return totalPerAcre * landAreaAcre;
  }
}));