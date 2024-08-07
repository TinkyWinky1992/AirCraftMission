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


export const postOperation = async (aircraft: FreindlyAircraft[] | null, coordinate: Coordinates, dateTime: Date) => {
  try {
    const response = await axios.post('http://localhost:5000/SaveOperation', {
      aircraft,
      coordinate,
      dateTime,
    });

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


export const getLineCoordinate = async(corr:Coordinates, lat:number, lng:number ) => {
  try{
    const response = await axios.get('http://localhost:5000/getLine', {
      params:{
        coordinate: corr,
        endLat: lat,
        endLng: lng,
      }
    });

    return response.data
  }catch(error){
    console.error('Error fetching timer:', error);
  }

}
  
export const DeleteAllOperation = async(id: number) =>{
  try{
    const response = await axios.delete('http://localhost:5000/delete', {
      params: {
        ids:id
      }

    });
    
    return response
  }catch(error){
    console.error('Error fetching timer:', error);
  }
}



