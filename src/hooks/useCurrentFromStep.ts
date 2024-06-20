import { create } from "zustand";

interface UseCurrentFromStep {
  step: number;
  setStep: (step: number) => void;
  getStep: () => number;
}

export const useCurrentFromStep = create<UseCurrentFromStep>((set, get) => ({
  step: 0,
  setStep: (step: number) => {
    set({ step });
  },
  getStep: () => {
    return get().step;
  },
}));
