import React, { createContext, useContext, useState } from "react";

interface SettingsContextType {
  notify: boolean;
  setNotify: (value: boolean | ((prev: boolean) => boolean)) => void;
  dark: boolean;
  setDark: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [notify, setNotify] = useState<boolean>(true);
  const [dark, setDark] = useState<boolean>(false);

  return (
    <SettingsContext.Provider value={{ notify, setNotify, dark, setDark }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
