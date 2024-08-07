import React from 'react';
import { useCoordinateContext } from '../../Popup';
import { Polyline } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

export const DirectionLine: React.FC<{FriendlyLat: number, FriendlyLon: number}> = ({FriendlyLat, FriendlyLon}) => {
    console.log(FriendlyLat)
    console.log(FriendlyLon)
    const { coordinates } = useCoordinateContext();

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

    const calculateTime = () => {
        if (coordinates && coordinates.radius && coordinates.speed) {
            return coordinates.radius / coordinates.speed;
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

    const calculateLine = (lat2:number, lng2: number) => {
        const timeFlight = calculateTime();
        if (coordinates && timeFlight !== null && coordinates.speed && coordinates.radius && coordinates.lat && coordinates.lng) {
            const initialDirection = calculateBearing(coordinates.lat, coordinates.lng, lat2, lng2);
            const destination = calculateDestination(coordinates.lat, coordinates.lng, initialDirection, coordinates.radius);
            return [
                [coordinates.lat, coordinates.lng],
                [destination.lat, destination.lng]
            ] as LatLngExpression[];
        } else {
            console.error('Missing data for calculation');
            return null;
        }
    }

    const lineCoordinates = calculateLine(FriendlyLat, FriendlyLon );

    return (
        <>
            {lineCoordinates && <Polyline positions={lineCoordinates} color="blue" />}
        </>
    );
}
