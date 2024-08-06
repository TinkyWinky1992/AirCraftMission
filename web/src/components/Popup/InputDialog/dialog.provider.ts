import { createContext, useContext } from "react";
import { Coordinates } from "../../../types";


type DialogContextType = {
  coordinates: Coordinates;
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>;
};

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useCoordinateContext = () => {
    const corr = useContext(DialogContext);
    if(corr === undefined)
        throw new Error("useCoordinateContext undefined");

    return corr;
}