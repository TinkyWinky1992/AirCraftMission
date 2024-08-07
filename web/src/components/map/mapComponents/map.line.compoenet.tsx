import React, { useEffect, useState } from 'react';
import { useCoordinateContext } from '../../Popup';
import { Polyline } from 'react-leaflet';
import { getLineCoordinate } from '../../../Service';
import { LatLngExpression } from 'leaflet';

export const DirectionLine: React.FC<{ FriendlyLat: number, FriendlyLon: number }> = ({ FriendlyLat, FriendlyLon }) => {
    const { coordinates } = useCoordinateContext();
    const [lineCoordinates, setLineCoordinates] = useState<LatLngExpression[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (coordinates && FriendlyLat && FriendlyLon) {
                    const resp = await getLineCoordinate(coordinates, FriendlyLat, FriendlyLon);
                    setLineCoordinates(resp);

                }
            } catch (error) {
                console.error('Error fetching aircraft data:', error);
            }
        };

        fetchData();
    }, [coordinates, FriendlyLat, FriendlyLon]); 

    return (
        <>
            {lineCoordinates.length > 0 && <Polyline positions={lineCoordinates} color="blue" />}
        </>
    );
};
