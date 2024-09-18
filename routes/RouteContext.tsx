// routes/RouteContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import useRoutes from './routes';

interface RouteContextProps {
  currentRoute: string;
  navigate: (routeName: string) => void;
}

const RouteContext = createContext<RouteContextProps | undefined>(undefined);

export const RouteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const routes = useRoutes();

  return <RouteContext.Provider value={routes}>{children}</RouteContext.Provider>;
};

export const useRoute = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
};
