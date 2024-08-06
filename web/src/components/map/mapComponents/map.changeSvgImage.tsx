import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

interface ZoomHandlerProps {
  onZoomChange: (zoom: number) => void;
}

export const ZoomHandler: React.FC<ZoomHandlerProps> = ({ onZoomChange }) => {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const handleZoom = () => {
      const newZoom = map.getZoom();
      if (newZoom !== zoom) {
        setZoom(newZoom);
        onZoomChange(newZoom);
      }
    };

    map.on('zoomend', handleZoom);

    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map, zoom, onZoomChange]);

  return null;
};


