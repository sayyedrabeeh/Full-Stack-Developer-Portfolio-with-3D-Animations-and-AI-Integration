// BackendContext.js
import { createContext, useState, useEffect } from "react";

export const BackendContext = createContext();

export function BackendProvider({ children }) {
  const [backendLoading, setBackendLoading] = useState(true);

  useEffect(() => {
    const pingBackend = async () => {
      try {
        await fetch("https://portfolio-backend-0gnb.onrender.com/api/accounts/counts/");
        setBackendLoading(false);
      } catch {
        setTimeout(pingBackend, 2000);
      }
    };
    pingBackend();
  }, []);

  return (
    <BackendContext.Provider value={{ backendLoading }}>
      {children}
    </BackendContext.Provider>
  );
}
