import { TargetCoordinateDto } from "src/Dto";
import { LatLngExpression } from 'leaflet';
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Radius of the Earth in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);
  
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // in meters
    return distance;
  };



export const convertTimeToString = (totalSeconds: number): string => {
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hoursLeft = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
    const secondsLeft = Math.floor(totalSeconds % 60);
  
    return `${days} days ${hoursLeft} hours ${minutesLeft} minutes ${secondsLeft} seconds`;
  };
  



  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const toDegrees = (radians: number) => radians * (180 / Math.PI);

  const calculateBearing = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const phi1 = toRadians(lat1);
      const lambda1 = toRadians(lon1);
      const phi2 = toRadians(lat2);
      const lambda2 = toRadians(lon2);

      const delta_lambda = lambda2 - lambda1;

      const y = Math.sin(delta_lambda) * Math.cos(phi2);
      const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(delta_lambda);

      let bearing = Math.atan2(y, x);
      bearing = toDegrees(bearing); 
      bearing = (bearing + 360) % 360; 

      return bearing;
  }

  const calculateTime = (coordinates:TargetCoordinateDto) => {
      if (coordinates && coordinates.maxFlightRadius && coordinates.speed) {
          return coordinates.maxFlightRadius / coordinates.speed;
      } else {
          console.error('Coordinates or its properties are null or undefined');
          return null;
      }
  }

  const calculateDestination = (lat: number, lng: number, bearing: number, distance: number) => {
      const R = 6371; // radius of the earth in kilometers
      const bearingRad = toRadians(bearing);
      const latRad = toRadians(lat);
      const lngRad = toRadians(lng);

      const lat2 = Math.asin(Math.sin(latRad) * Math.cos(distance / R) +
          Math.cos(latRad) * Math.sin(distance / R) * Math.cos(bearingRad));
      const lng2 = lngRad + Math.atan2(Math.sin(bearingRad) * Math.sin(distance / R) * Math.cos(latRad),
          Math.cos(distance / R) - Math.sin(latRad) * Math.sin(lat2));

      return {
          lat: toDegrees(lat2),
          lng: toDegrees(lng2)
      };
  }
  export const calculateLine = (coordinates:TargetCoordinateDto,lat2:number, lng2: number) => {
    const timeFlight = calculateTime(coordinates);
    if (coordinates && timeFlight !== null && coordinates.speed && coordinates.maxFlightRadius && coordinates.lat && coordinates.lng) {
        const initialDirection = calculateBearing(coordinates.lat, coordinates.lng, lat2, lng2);
        const destination = calculateDestination(coordinates.lat, coordinates.lng, initialDirection, coordinates.maxFlightRadius);
        return [
            [coordinates.lat, coordinates.lng],
            [destination.lat, destination.lng]
        ] as LatLngExpression[];
    } else {
        console.error('Missing data for calculation');
        return null;
    }
}
