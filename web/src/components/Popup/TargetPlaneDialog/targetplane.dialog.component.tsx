import React, { Dispatch } from "react";
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import { Divider, TextField } from "@mui/material";
import { useCoordinateContext } from "../InputDialog";

type PlaneProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  isAirCraftAround: boolean;
  setRadius: Dispatch<React.SetStateAction<number>>;
  setOuterRadius: Dispatch<React.SetStateAction<number>>;
  impactRadius: number
};

export const TargetPlaneDetails: React.FC<PlaneProps> = ({ anchorEl, open, handleClose, isAirCraftAround, setRadius, setOuterRadius, impactRadius}) => {
  const { coordinates } = useCoordinateContext();

  const handleImpactRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (!isNaN(numericValue) && numericValue >= 0) {
      setRadius(numericValue);
    }
  };


  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (!isNaN(numericValue) && numericValue >= 0) {
      setOuterRadius(numericValue);
    }
  };

  // Fallback values if coordinates is null
  const latitude = coordinates?.lat ?? 'N/A';
  const longitude = coordinates?.lng ?? 'N/A';
  const speed = coordinates?.speed ?? 'N/A';
  const radius = coordinates?.radius ?? 'N/A';

  return (
    <Popover
      id="simple-popover"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        style: {
          width: '500px',
          height: '500px',
          backgroundColor: 'white',
          color: 'black', // Change color to black for better contrast
          padding: '16px',
        },
      }}
    >
      <Typography variant="h6" sx={{ color: 'black' }}>{`Latitude: ${latitude}`}</Typography>
      <Typography variant="h6" sx={{ color: 'black' }}>{`Longitude: ${longitude}`}</Typography>
      <Typography variant="h6" sx={{ color: 'black' }}>{`Flight Speed: ${speed}`}</Typography>
      <Typography variant="h6" sx={{ color: 'black' }}>{`Maximum flight radius: ${radius}`}</Typography>
      <Typography variant="h6" sx={{ color: 'black' }}>{`AirCraft Around: ${isAirCraftAround}`}</Typography>
      <Divider />

      <TextField
        label="Change Radius of impact"
        name="speed"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleImpactRadiusChange}
        type="number"
      />

      <TextField
        label="Change Radius of  outer Radius"
        name="speed"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleRadiusChange}
        type="number"
      />  
    </Popover>
  );
};
