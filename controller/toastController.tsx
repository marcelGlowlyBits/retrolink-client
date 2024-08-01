// @ts-nocheck

import { useToastStore } from "@/stores/useToastStore";
import { Toast } from '@/common/ui/toast';
import { ToastViewport} from '@/common/ui/toastViewport';

import { Provider } from '@radix-ui/react-toast';
  
  export const ToastController = ({ id }) => {
    const toasts = useToastStore((state) => state[id]);
    const remove = useToastStore((state) => state.remove);

    return (
      <Provider>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          zIndex={index}
          onClose={() => remove(toast)}
          toast={toast}
        />
      ))}
      <ToastViewport />
    </Provider>
    )
  }