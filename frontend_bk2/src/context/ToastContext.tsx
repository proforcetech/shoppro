import { createContext, useState, useContext, type ReactNode } from 'react';

type ToastContextType = {
  show: (text: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [msg, setMsg] = useState<string | null>(null);

  const show = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {msg && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
          {msg}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};
