import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import { Divider } from "@mui/material";



type PlaneProps = {
  lng: number;
  log: number;
  TimeRemning: string
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
};

export const FriendlyPlaneDetails: React.FC<PlaneProps> = ({ lng, log, TimeRemning, open, anchorEl, handleClose }) => {

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
          color: 'black',
          padding: '16px',
        },
      }}
    >
      <Typography variant="h6">{`Latitude: ${lng}`}</Typography>
      <Typography variant="h6">{`Longitude: ${log}`}</Typography>
      <Divider />
      <Typography variant="h6" sx={{fontSize:"1rem"}}>{`Time Remaining: ${TimeRemning}`}</Typography>
    </Popover>
  );
};
