// routes/index.ts
import { useState } from 'react';

const useRoutes = () => {
  const [currentRoute, setCurrentRoute] = useState('Home');

  const navigate = (routeName: string) => {
    setCurrentRoute(routeName);
  };

  return { currentRoute, navigate };
};

export default useRoutes;
