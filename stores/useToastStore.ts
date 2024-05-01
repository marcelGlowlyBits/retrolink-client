// @ts-nocheck
import { create } from 'zustand';

export const useToastStore = create((set) => ({
    notifications: [],
    add: (toast) => {
      set((state) => {
        const controllerId = toast.controllerId ?? 'notifications';
        return { [controllerId]: state[controllerId].concat(toast) };
      });
    },
    remove: (toast) => {
      set((state) => {
        const controllerId = toast.controllerId ?? 'notifications';
        return {
          [controllerId]: state[controllerId].filter((t) => t.id !== toast.id),
        };
      });
    },
  }));