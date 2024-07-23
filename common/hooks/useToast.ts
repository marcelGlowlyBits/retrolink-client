// @ts-nocheck

import { useToastStore } from '@/stores/useToastStore'

export const useToast = () => {
  const showToast = (payload) => {
    const id = payload.id ?? Math.random().toString(36)

    return useToastStore.getState().add({ id, ...payload })
  }

  return {
    showToast,
  }
}
