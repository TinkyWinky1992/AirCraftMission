import React, {Dispatch} from "react";
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import { Divider, TextField } from "@mui/material";
import { useCoordinateContext } from "../InputDialog";
type PlaneProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  isAirCraftAround: boolean
  setRadius: Dispatch<React.SetStateAction<number>>;
};


export const TargetPlaneDetails: React.FC<PlaneProps> = ({ anchorEl, open, handleClose,isAirCraftAround, setRadius}) => {
    const { coordinates } = useCoordinateContext();
    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = Number(value);

        if (!isNaN(numericValue) && numericValue >= 0) {
          setRadius(numericValue); 
        }
      };
    

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
            color: 'white',
            padding: '16px',
          },
        }}
      >
        <Typography variant="h6" sx={{color:'black'}}>{`Latitude: ${coordinates.lat}` }</Typography>
        <Typography variant="h6" sx={{color:'black'}}>{`Longitude: ${coordinates.lng}` }</Typography>
        <Typography variant="h6" sx={{color:'black'}}>{`Flight Speed: ${coordinates.speed}`}</Typography>
        <Typography variant="h6" sx={{color:'black'}}>{`Maximum flight radius: ${coordinates.radius}`}</Typography>
        <Typography variant="h6" sx={{color:'black'}}>{`AirCraft Around: ${isAirCraftAround}`}</Typography>
        <Typography variant="h6" sx={{color:'black'}}>{`AirCraft Distance near by:  `}</Typography>
        <Divider/>

        <TextField
                label="Change Area Radius"
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
  