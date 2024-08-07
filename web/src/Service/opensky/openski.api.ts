import axios from 'axios';

type Aircraft = {
    icao24: string;
    callsign: string;
    longitude: number;
    latitude: number;
    velocity: number;

}



  export const fetchAirCraft = async (): Promise<Aircraft[]> => {
    try {
      const response = await axios.get('https://flight-radar1.p.rapidapi.com/flights/list-in-boundary', {
        params: {
          bl_lat: 29.5,  // Bottom-left latitude
          bl_lng: 34.0,  // Bottom-left longitude
          tr_lat: 33.5,  // Top-right latitude
          tr_lng: 40.5,  // Top-right longitude
          limit: 200     // Number of results to return
        },
        headers: {
          'x-rapidapi-host': 'flight-radar1.p.rapidapi.com',
          'x-rapidapi-key': '5345082c84msh650de8667ef66b8p16ea8cjsn2fc7e52667ac'
        }
      });
      
      // Adjust the response parsing based on the actual structure
      return response.data.aircraft.map((state: any) => ({
        icao24: state[0],
        callsign: state[1],
        latitude: state[2],
        longitude: state[3],
        velocity: state[4],
        altitude: state[5]
      }));

    } catch (error) {
      console.error('Error fetching aircraft data:', error);
      return [];
    }
    
  }
  



  
  /* 
      const aircraftData: Aircraft[] = [
        { icao24: '367c8c6c', callsign: '896604', latitude: 30.337, longitude: 39.835, velocity: 114 },
        { icao24: '367ca1d0', callsign: '742838', latitude: 30.015, longitude: 35.327, velocity: 194 },
        { icao24: '367ca3f8', callsign: '738444', latitude: 33.43, longitude: 34.343, velocity: 354 },
        { icao24: '367c5cf2', callsign: '8965D4', latitude: 31.523, longitude: 36.882, velocity: 288 },
        { icao24: '367c8a48', callsign: 'A744B7', latitude: 33.146, longitude: 39.802, velocity: 266 },
        { icao24: '367c9666', callsign: '4D2475', latitude: 32.154, longitude: 34.645, velocity: 124 },
        { icao24: '367ca47c', callsign: 'AE595D', latitude: 31.627, longitude: 36.552, velocity: 289 },
        { icao24: '367ca230', callsign: '7434C8', latitude: 32.131, longitude: 35.807, velocity: 173 },
        { icao24: '367ca5c6', callsign: '738443', latitude: 32.025, longitude: 34.642, velocity: 287 },
        { icao24: '367c9c9d', callsign: '7395A2', latitude: 31.958, longitude: 34.748, velocity: 247 },
        { icao24: '367ca014', callsign: '73951E', latitude: 31.959, longitude: 34.754, velocity: 180 },
        { icao24: '367ca462', callsign: '49D369', latitude: 32.014, longitude: 34.867, velocity: 259 },
        { icao24: '367ca71e', callsign: '738287', latitude: 31.994, longitude: 34.891, velocity: 106 },
        { icao24: '367ca61b', callsign: '738284', latitude: 31.999, longitude: 34.877, velocity: 120 },
        { icao24: '367c5aee', callsign: '7380CB', latitude: 32.006, longitude: 34.871, velocity: 319 },
        { icao24: '367c9ee1', callsign: '738289', latitude: 32, longitude: 34.877, velocity: 120 }
      ];
      // Return the hardcoded data
      return aircraftData;



    */