import React, { useEffect } from 'react';
import {  useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useCoordinateContext } from '../../Popup';

export const MapUpdater: React.FC = () => {
    const { coordinates } = useCoordinateContext();
  
    const map = useMap();
  
    useEffect(() => {
      if (coordinates && coordinates.lat !== null && coordinates.lng !== null) {
        map.setView([coordinates.lat, coordinates.lng], 13); 
      }
    }, [coordinates, map]);
  
    return null;
  };
