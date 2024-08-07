import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Grid, Typography, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import { getAllOperations, DeleteAllOperation } from "../../../../Service";
import { FriendlyAircraftDto, TargetCoordinateDto, OperationDto } from '../../../../Dto';

interface DataResponse {
    ThreatenedAirCrafts: FriendlyAircraftDto[];
    EnemyAirCrafts: TargetCoordinateDto[];
    Operations: OperationDto[];
}

export const DrawerNavigation: React.FC<{ open: boolean }> = ({ open }) => {
    const [data, setData] = useState<DataResponse | null>(null);
    const [FriendlyAircraft, setFriendlyAircraft] = useState<FriendlyAircraftDto[]>([]);
    const [EnemyAirCrafts, setEnemyAirCrafts] = useState<TargetCoordinateDto[]>([]);
    const [Operations, setOperations] = useState<OperationDto[]>([]);
    const [selectedOperation, setSelectedOperation] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await getAllOperations();
            setData(resp);
        };
        fetchData();
    }, [open, selectedOperation]);

    useEffect(() => {
        if (data) {
            setFriendlyAircraft(data.ThreatenedAirCrafts);
            setEnemyAirCrafts(data.EnemyAirCrafts);
            setOperations(data.Operations);
        }
    }, [data]);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    const getFriendlyAircraftForOperation = (operationId: number): FriendlyAircraftDto[] | string => {
        if (FriendlyAircraft) {
            const aircrafts = FriendlyAircraft.filter(aircraft => aircraft.id === operationId);
            return aircrafts.length > 0 ? aircrafts : "Not detected";
        }
        return "Not detected";
    };

    const getEnemyAircraftForOpertaion = (operationId: number): TargetCoordinateDto[] | string => {
        if (EnemyAirCrafts) {
            const aircrafts = EnemyAirCrafts.filter(aircraft => aircraft.id === operationId);
            return aircrafts.length > 0 ? aircrafts : "Not detected";
        }
        return "Not detected";
    };

    const clickhandleOperation = async (operationId: number) => {
        // Implement the logic for marking the operation here
        console.log(`Marked operation with ID: ${operationId}`);
        
        await DeleteAllOperation(operationId);
        setSelectedOperation(true)
    };


    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container sx={{ minHeight: '100vh' }}>
                <Box sx={{ width: 500, padding: 2 }} role="presentation">
                    <Divider />
                    {(!Operations || Operations.length == 0) && (
                         <Grid container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Grid item>
                                <Typography variant="h6">Data Not Exist</Typography>
                            </Grid>
                        </Grid>   
                    )}
                    
                    {Operations.map(operation => (
                        <Box key={operation.id} sx={{ marginBottom: 2 }}>
                            <Divider />
                            <Box sx={{ padding: 2 }}>
                                <Typography variant="h6" component="h3">
                                    Operation {operation.id}: {new Date(operation.dateTime).toLocaleString()}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Enemy Aircraft:</strong>
                                </Typography>
                                
                                {(() => {
                                    const enemyAircraft = getEnemyAircraftForOpertaion(operation.id);
                                    if (typeof enemyAircraft === "string") {
                                        return <Typography variant="body2">{enemyAircraft}</Typography>;
                                    }
                                    return enemyAircraft.map(aircraft => (
                                        <Box key={aircraft.id} sx={{ padding: 1 }}>
                                            <Typography variant="body2">ID: {aircraft.id}</Typography>
                                            <Typography variant="body2">Latitude: {aircraft.latitude}</Typography>
                                            <Typography variant="body2">Longitude: {aircraft.longitude}</Typography>
                                            <Typography variant="body2">Speed: {aircraft.speed}km/h</Typography>
                                            <Typography variant="body2">Threatening: {aircraft.threatening}</Typography>
                                        </Box>
                                    ));
                                })()}
                                <Typography variant="body1">
                                    <strong>Friendly Aircraft:</strong>
                                </Typography>
                                {(() => {
                                    const friendlyAircrafts = getFriendlyAircraftForOperation(operation.id);
                                    if (typeof friendlyAircrafts === "string") {
                                        return <Typography variant="body2">{friendlyAircrafts}</Typography>;
                                    }
                                    return friendlyAircrafts.map(aircraft => (
                                        <Box key={aircraft.id} sx={{ padding: 1 }}>
                                            <Typography variant="body2">ID: {aircraft.id}</Typography>
                                            <Typography variant="body2">Latitude: {aircraft.latitude}</Typography>
                                            <Typography variant="body2">Longitude: {aircraft.longitude}</Typography>
                                            <Typography variant="body2">Speed: {aircraft.speed}</Typography>
                                        </Box>
                                    ));
                                })()}
                                <Button
                                    color="error"
                                    onClick={() => clickhandleOperation(operation.id)}
                                    sx={{ marginTop: 2 }}
                                >
                                    <ClearIcon />
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Grid>
        </ThemeProvider>
    );
};
