import React, { createContext, useState, useContext, ReactNode, SetStateAction, Dispatch } from 'react';
import { Coordinates, FreindlyAircraft } from '../../types';

// Define the context type
interface DetailsContextType {
  friendlyAircraft: FreindlyAircraft | null;
  setFriendlyAircraft: Dispatch<SetStateAction<FreindlyAircraft | null>>;
  enemyDetails: Coordinates | null;
  setEnemyDetails: Dispatch<SetStateAction<Coordinates | null>>;
}


const DetailsContext = createContext<DetailsContextType | undefined>(undefined);


export const DetailsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [friendlyAircraft, setFriendlyAircraft] = useState<FreindlyAircraft | null>(null);
  const [enemyDetails, setEnemyDetails] = useState<Coordinates | null>(null);

  return (
    <DetailsContext.Provider value={{ friendlyAircraft, setFriendlyAircraft, enemyDetails, setEnemyDetails }}>
      {children}
    </DetailsContext.Provider>
  );
};


export const useDetailsContext = () => {
  const context = useContext(DetailsContext);
  if (context === undefined) {
    throw new Error('useDetailsContext must be used within a DetailsProvider');
  }
  return context;
};
