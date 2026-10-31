import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext({ showToast: () => {} });

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  function showToast(message, type = 'info') {
    window.clearTimeout(timer.current);
    setToast({ message, type });
    timer.current = window.setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return <ToastContext.Provider value={{ showToast }}>
    {children}
    <Toast message={toast?.message} type={toast?.type} />
  </ToastContext.Provider>;
}

export function useToast() { return useContext(ToastContext); }
