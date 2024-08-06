import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useCoordinateContext } from "./dialog.provider";

export const DialogInputCor: React.FC = () => {
    const [open, setOpen] = useState(true);
    const [tempCoordinates, setTempCoordinates] = useState({ lat: '', lng: '', speed: '', radius: '' });
    const { setCoordinates } = useCoordinateContext();

    const handleClose = () => {
        setOpen(false);
    };

    const handleButtonClick = () => {
        const lat = Number(tempCoordinates.lat);
        const lng = Number(tempCoordinates.lng);
        const speed = Number(tempCoordinates.speed);
        const radius = Number(tempCoordinates.radius);

        if (isNaN(lat) || isNaN(lng) || isNaN(speed) || isNaN(radius)) {
            console.log("Coordinates or details are not valid numbers");
            return;
        }
        
        setCoordinates({
            lat,
            lng,
            speed,
            radius
        });
        
        handleClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTempCoordinates(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Enter Coordinates</DialogTitle>
            <DialogContent>
                <TextField
                    label="Latitude"
                    name="lat"
                    value={tempCoordinates.lat}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Longitude"
                    name="lng"
                    value={tempCoordinates.lng}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Maximum flight radius"
                    name="radius"
                    value={tempCoordinates.radius}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Flight Speed"
                    name="speed"
                    value={tempCoordinates.speed}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleButtonClick} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};
