import React from 'react';
import { Grid, Typography } from '@mui/material';
import './coordinatebutton.style.css'; // Ensure this CSS file is imported
import { DialogState } from '../../../types';
export const CoordinateButton: React.FC<DialogState>= ({setOpen}) => {

  const OnHandleClick = () => {
    setOpen(true);
  }  
  return (
    <Grid
      container
      alignItems="center"  
      justifyContent="center"
      direction={'column'}
      sx={{ height: '100%', width: '100%' }}  
    >
      <Grid item>
        <Typography variant="h6" sx={{ color: 'white' }} gutterBottom>
          Put New Coordinates
        </Typography>
      </Grid>
      <Grid item>
        <button className="btn-class-name" onClick={OnHandleClick}>
          <span className="back"></span>
          <span className="front"></span>
        </button>
      </Grid>
    </Grid>
  );
};
