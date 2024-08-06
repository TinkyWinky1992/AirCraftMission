import axios from 'axios';
import { Coordinates, FreindlyAircraft } from '../../types';

export const getTimer = async (lat: number, lng: number, coordinate: Coordinates) => {
  try {
    const response = await axios.get('http://localhost:5000/timer', {
      params: {
        lat,
        lng,
        targetLat: coordinate.lat,
        targetLng: coordinate.lng,
        speed: coordinate.speed,
        radius: coordinate.radius
      }
    });

    return response.data; 
  } catch (error) {
    console.error('Error fetching timer:', error);
  }
};

export const getNearPlane = async(aircraft: FreindlyAircraft[], coordinate: Coordinates, radius: number) => {
  try {
    const response = await axios.get('http://localhost:5000/nearbyplane', {
      params: {
        aircraft: aircraft,
        coordinates: coordinate,
        radius:radius
      }
    });

    return response.data; 
  } catch (error) {
    console.error('Error fetching timer:', error);
  }
}




