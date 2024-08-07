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

//nearbyplane

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


export const postOperation = async (aircraft: FreindlyAircraft[] | null, coordinate: Coordinates, dateTime: Date) => {
  try {
    const response = await axios.post('http://localhost:5000/SaveOperation', {
      aircraft,
      coordinate,
      dateTime,
    });

    console.log('Operation posted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching timer:', error);
  }
};


export const getAllOperations = async() =>{
  try{
    const response = await axios.get('http://localhost:5000/AllOperations')
    return response.data

  }catch(error){
    console.error('Error fetching timer:', error);
  }
}



  
export const DeleteAllOperation = async(id: number) =>{
  try{
    console.log(typeof(id))
    const response = await axios.delete('http://localhost:5000/delete', {
      params: {
        ids:id
      }

    });
    console.log(response)

  }catch(error){
    console.error('Error fetching timer:', error);
  }
}



