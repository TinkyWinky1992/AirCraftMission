import React, { useState } from "react";
import { DialogState } from "../../../types";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useCoordinateContext } from "./dialog.provider";

export const DialogInputCor: React.FC<DialogState> = ({ open, setOpen }) => {
    const [tempCoordinates, setTempCoordinates] = useState({ lat: '', lng: '', speed: '', radius: '' });
    const { setCoordinates } = useCoordinateContext();
    const [errors, setErrors] = useState({ lat: false, lng: false, speed: false, radius: false });

    const handleClose = () => {
        setOpen(false);
    };

    const handleButtonClick = () => {
        const lat = Number(tempCoordinates.lat);
        const lng = Number(tempCoordinates.lng);
        const speed = Number(tempCoordinates.speed);
        const radius = Number(tempCoordinates.radius);

        const newErrors = {
            lat: isNaN(lat) || tempCoordinates.lat === '',
            lng: isNaN(lng) || tempCoordinates.lng === '',
            speed: isNaN(speed) || tempCoordinates.speed === '',
            radius: isNaN(radius) || tempCoordinates.radius === ''
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some(error => error);
        if (hasError) {
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
        setErrors(prevState => ({ ...prevState, [name]: false }));
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
                    error={errors.lat}
                    helperText={errors.lat ? "Latitude is required and must be a number" : ""}
                />
                <TextField
                    label="Longitude"
                    name="lng"
                    value={tempCoordinates.lng}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={errors.lng}
                    helperText={errors.lng ? "Longitude is required and must be a number" : ""}
                />
                <TextField
                    label="Maximum flight radius"
                    name="radius"
                    value={tempCoordinates.radius}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={errors.radius}
                    helperText={errors.radius ? "Radius is required and must be a number" : ""}
                />
                <TextField
                    label="Flight Speed"
                    name="speed"
                    value={tempCoordinates.speed}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={errors.speed}
                    helperText={errors.speed ? "Speed is required and must be a number" : ""}
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
