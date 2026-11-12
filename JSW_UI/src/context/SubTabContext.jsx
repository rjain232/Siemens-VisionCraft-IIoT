import { createContext, useContext, useMemo, useState } from "react";

const SubTabContext = createContext();

export function SubTabProvider({ children }) {
  const [currentSubTab, setCurrentSubTab] = useState(null);
  const value = useMemo(
    () => ({ currentSubTab, setCurrentSubTab }),
    [currentSubTab]
  );
  return (
    <SubTabContext.Provider value={value}>
      {children}
    </SubTabContext.Provider>
  );
}

export function useSubTab() {
  return useContext(SubTabContext);
}
