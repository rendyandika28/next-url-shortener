import { create } from "zustand";

export interface Toaster {
  text: string;
  type?: "success" | "error" | "warning";
}

type ToasterOptions = Omit<Toaster, "text"> & { timeout?: number };

export interface TypeUseToaster {
  toaster: Toaster | null;
  isShowing: boolean;
  show: (text: string, options?: ToasterOptions) => void;
}

const useToaster = create<TypeUseToaster>((set, get) => {
  const toaster: Toaster | null = null;
  const isShowing: boolean = !!toaster;

  const show = (text: string, options?: ToasterOptions): void => {
    if (!get().toaster) {
      set(() => ({
        toaster: {
          text,
          ...options,
        },
      }));
      setTimeout(() => {
        set(() => ({ toaster: null }));
      }, options?.timeout || 3000);
    }
  };

  return {
    toaster,
    isShowing,
    show,
  };
});

export default useToaster;
