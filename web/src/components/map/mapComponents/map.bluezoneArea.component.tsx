
import React from 'react';
import { Circle, useMap } from 'react-leaflet';
export const ZoomAwareBlueCircle: React.FC<{ position: [number, number], radius: number }> = ({ position, radius }) => {
    const map = useMap();
    const zoom = map.getZoom();
    const radiusCalculation = (radius) * (zoom / 10);
  
    return (
      <Circle
        center={position}
        radius={radiusCalculation}
        pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
      ></Circle>
    );
  };