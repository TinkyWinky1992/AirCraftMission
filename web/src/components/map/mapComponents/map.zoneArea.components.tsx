
import React from 'react';
import { Circle, useMap } from 'react-leaflet';
export const ZoomAwareCircle: React.FC<{ position: [number, number], radius: number }> = ({ position, radius }) => {
    const map = useMap();
    const zoom = map.getZoom();
    const radiusCalculation = radius * (zoom / 10);
  
    return (
      <Circle
        center={position}
        radius={radiusCalculation}
        pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }}
      ></Circle>
    );
  };