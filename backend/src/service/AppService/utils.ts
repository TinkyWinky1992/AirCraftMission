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
  
