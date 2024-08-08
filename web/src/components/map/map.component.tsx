import React, { useState, useEffect } from 'react';
import { useDetailsContext } from './mapdetials.provider.component';
import { useCoordinateContext } from '../Popup';
import { PlaneIcon, TargetPlaneIcon, render } from '../Icon';
import { TargetPlaneDetails, FriendlyPlaneDetails,   } from '../Popup';
import { MapUpdater, ZoomAwareCircle, ZoomAwareBlueCircle, ZoomHandler, DirectionLine} from './mapComponents';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { FreindlyAircraft } from '../../types';
import { getNearPlane, getTimer } from '../../Service';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { fetchAirCraft } from '../../Service';
import { Grid } from '@mui/material';


const createPlaneIcon = (Component: React.FC<{ sizeRem: number }>, iconSize: number) => {
  const svgString = render(Component, iconSize);
  return L.divIcon({
    className: 'custom-icon',
    html: svgString,
  });
};

export const Map: React.FC = () => {
  const { setFriendlyAircraft, setEnemyDetails, enemyDetails, friendlyAircraft } = useDetailsContext();
  const [aircraft, setAircraft] = useState<FreindlyAircraft[]>([]);
  const [closestPlane, setClosestPlane] = useState<FreindlyAircraft | null>(null);
  const { coordinates, setCoordinates } = useCoordinateContext();
  const [zoom, setZoom] = useState<number>(8);
  const [timer, setTimer] = useState<string>('');
  const iconSizeRem = 1 + (zoom - 8) * 0.2;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [friendlyAnchor, setFriendlyAnchor] = useState<HTMLElement | null>(null);

  const [radius, setRadius] = useState<number>(500);
  const [outerRadius, setouterRadius] = useState<number>(1800);
  const [selectedPlane, setSelectedPlane] = useState<any | null>(null);

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const handleFriendlyMarkClick = (plane: any, event: L.LeafletEvent) => {
    //@ts-ignore
    const target = event.originalEvent.currentTarget as HTMLElement;
    setSelectedPlane(plane);
    setFriendlyAnchor(target);
  };

  const handleFriendlyClose = () => {
    setFriendlyAnchor(null);
    setSelectedPlane(null);
  };

  const handleMarkerClick = (event: L.LeafletEvent) => {
    //@ts-ignore
    const target = event.originalEvent.currentTarget as HTMLElement;
    setAnchorEl(target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchAirCraft();
        setAircraft(resp || []);
        console.log(aircraft)

      } catch (error) {
        console.error('Error fetching aircraft data:', error);
      }
    };


    fetchData();
  }, []);

  useEffect(() => {
    if (coordinates) {
      setEnemyDetails(coordinates);
      const fetchNearByPlane = async () => {
        try {
          const plane = await getNearPlane(aircraft, coordinates, outerRadius)
          setClosestPlane(plane);
          setFriendlyAircraft(plane)

        }catch(error){
          console.log(error)
        }

      }
      fetchNearByPlane()
    }
  }, [aircraft, coordinates, outerRadius, zoom]);

  useEffect(() => {
    const fetchTimer = async () => {
      if (closestPlane && coordinates) {
        try{
          const timeRemaining = await getTimer(closestPlane.latitude, closestPlane.longitude, coordinates);
          setTimer(timeRemaining);

        }catch(error){
          console.log(error)
        }

      }
    };

    fetchTimer();
  }, [closestPlane, coordinates]);

  useEffect(() => {
    if(enemyDetails) {
      setCoordinates(enemyDetails)
    }
    if(friendlyAircraft) {
      setClosestPlane(friendlyAircraft)
    }
    else
      setClosestPlane(null)
  },[enemyDetails, friendlyAircraft])

  const openTarget = Boolean(anchorEl);
  const openNonTarget = Boolean(friendlyAnchor);

  return (
    <Grid container sx={{ height: "100vh", width: "100vw" }}>
      <MapContainer 
      center={[31.0461, 34.8516]} 
      zoom={8}  
      style={{ height: "100vh", width: "100vw" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      
        {coordinates && coordinates.lat !== null && coordinates.lng !== null && (
          <>
            <Marker 
              position={[coordinates.lat, coordinates.lng]}
              icon={createPlaneIcon(TargetPlaneIcon, iconSizeRem)}
              eventHandlers={{
                click: handleMarkerClick
              }}
            />
            <ZoomAwareCircle position={[coordinates.lat, coordinates.lng]} radius={radius} />
            <ZoomAwareBlueCircle position={[coordinates.lat, coordinates.lng]} radius={outerRadius} />
          </>
        )}

        <TargetPlaneDetails
          anchorEl={anchorEl}
          open={openTarget}
          handleClose={handleClose}
          setRadius={setRadius}
          setOuterRadius={setouterRadius}
        />

        {coordinates && coordinates.lat !== null && coordinates.lng !== null && closestPlane && (
          <Marker 
            key={closestPlane.icao24} 
            position={[closestPlane.latitude, closestPlane.longitude]} 
            icon={createPlaneIcon(PlaneIcon, iconSizeRem)}
            eventHandlers={{
              click: (event: L.LeafletEvent) => handleFriendlyMarkClick(closestPlane, event)
            }}
          >
            {selectedPlane === closestPlane && (
              <FriendlyPlaneDetails
                lng={closestPlane.latitude}
                log={closestPlane.longitude}
                TimeRemning={timer}
                anchorEl={friendlyAnchor}
                open={openNonTarget}
                handleClose={handleFriendlyClose}
              />
            )}
          </Marker>
        )}
        { closestPlane &&  (
          <DirectionLine FriendlyLat={closestPlane?.latitude} FriendlyLon={closestPlane?.longitude}/>
        )}
        
        <ZoomHandler onZoomChange={handleZoomChange} />
        <MapUpdater />
      </MapContainer>
    </Grid>

    
  );
};