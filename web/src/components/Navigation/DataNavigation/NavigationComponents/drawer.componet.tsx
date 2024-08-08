import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Grid, Typography, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import MapIcon from '@mui/icons-material/Map';
import { getAllOperations, DeleteAllOperation } from "../../../../Service";
import { FriendlyAircraftDto, TargetCoordinateDto, OperationDto } from '../../../../Dto';
import { useDetailsContext } from "../../../map";
interface DataResponse {
    ThreatenedAirCrafts: FriendlyAircraftDto[];
    EnemyAirCrafts: TargetCoordinateDto[];
    Operations: OperationDto[];
}

export const DrawerNavigation: React.FC<{ open: boolean }> = ({ open }) => {
    const [data, setData] = useState<DataResponse | null>(null);
    const [FriendlyAircraft, setFriendlyAircraftcurret] = useState<FriendlyAircraftDto[]>([]);
    const [EnemyAirCrafts, setEnemyAirCrafts] = useState<TargetCoordinateDto[]>([]);
    const [Operations, setOperations] = useState<OperationDto[]>([]);
    const [selectedOperation, setSelectedOperation] = useState(false);
    const {setEnemyDetails, setFriendlyAircraft} = useDetailsContext()

    useEffect(() => {
        const fetchData = async () => {
            try{
                const resp = await getAllOperations();
            
                setData(resp);
                setSelectedOperation(false)
            }catch(error){
                console.log(error)
            }

        };
        fetchData();
    }, [open,selectedOperation]);

    useEffect(() => {
        if (data) {
            setFriendlyAircraftcurret(data.ThreatenedAirCrafts);
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

    const getFriendlyAircraftForOperation = (operation: OperationDto): FriendlyAircraftDto | string => {
        const aircraft = FriendlyAircraft.find(aircraft => aircraft.id === operation.threatenedAircraftId);
        return aircraft ? aircraft : "Not detected";
    };

    const getEnemyAircraftForOpertaion = (operationId: number): TargetCoordinateDto[] | string => {
        if (EnemyAirCrafts) {
            const aircrafts = EnemyAirCrafts.filter(aircraft => aircraft.id === operationId);
            return aircrafts.length > 0 ? aircrafts : "Not detected";
        }
        return "Not detected";
    };

    const clickhandleOperation = async (operationId: number) => {
        console.log(`Marked operation with ID: ${operationId}`);
        try{
            await DeleteAllOperation(operationId);
            setSelectedOperation(true)
        }catch(error){
            console.log(error)
        }

        
    };
    const handleChangeOperation  = (operationId: number) => {
        const selectedOperation = Operations.find(operation => operation.id === operationId);

        if (selectedOperation) {
            
           const selectedFriendlyAircraft = FriendlyAircraft.find(aircraft => aircraft.id === selectedOperation.threatenedAircraftId);
           const selectedTargetAircraft = EnemyAirCrafts.find(target => target.id === selectedOperation.enemyAircraftId);
            
            if(selectedFriendlyAircraft)
                setFriendlyAircraft({
                    ...selectedFriendlyAircraft,
                    velocity: selectedFriendlyAircraft.speed,
                    icao24:  '',
                    callsign: '',

                });

            if (selectedTargetAircraft) {
                    setEnemyDetails({
                        ...selectedTargetAircraft,
                        lat: selectedTargetAircraft.latitude,
                        lng: selectedTargetAircraft.longitude,
                        radius: selectedTargetAircraft.radius,
                        speed: selectedTargetAircraft.speed,
                    });
            }
      

         }
    }


    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container sx={{ minHeight: '100vh' }}>
                <Box sx={{ width: {lg: 500, xs: 300 }, padding: 2 }} role="presentation">
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
                                    <Typography>Enemy Aircraft:</Typography>
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
                                    <Typography>Friendly Aircraft:</Typography>
                                </Typography>
                                {(() => {
                                    const friendlyAircraft = getFriendlyAircraftForOperation(operation);
                                  
                                    if (typeof friendlyAircraft === "string") {
                                        return <Typography variant="body2">{friendlyAircraft}</Typography>;
                                    }
                                    return (
                                        <Box sx={{ padding: 1 }}>
                                            <Typography variant="body2">ID: {friendlyAircraft.id}</Typography>
                                            <Typography variant="body2">Latitude: {friendlyAircraft.latitude}</Typography>
                                            <Typography variant="body2">Longitude: {friendlyAircraft.longitude}</Typography>
                                            <Typography variant="body2">Speed: {friendlyAircraft.speed}</Typography>
                                        </Box>
                                    );
                                })()}
                                <Button
                                    color="error"
                                    onClick={() => clickhandleOperation(operation.id)}
                                    sx={{ marginTop: 2 }}
                                >
                                    <ClearIcon />
                                </Button>
                                <Button
                                    color="info"
                                    onClick={() => handleChangeOperation(operation.id)}
                                    sx={{ marginTop: 2 }}
                                >
                                    <MapIcon />
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Grid>
        </ThemeProvider>
    );
};