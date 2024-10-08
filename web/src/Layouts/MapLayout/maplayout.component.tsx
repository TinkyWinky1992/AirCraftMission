import React, { useState } from 'react';
import { Map, DialogInputCor, DialogContext } from '../../components';
import { Grid } from '@mui/material';
import './maplayout.style.css';
import { Coordinates, DialogState } from '../../types';

export const MapLayout: React.FC<DialogState> = ({ open, setOpen }) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  return (
    <Grid container>
      <Grid item className='layout' sx={{ 
        width: {xl:"50rem",lg:"45rem", sm: "40rem", xs:"20rem" },
        height: {xl:"25rem", lg:"20rem", sm: "20rem", xs:"17rem"}
      }}>
        <DialogContext.Provider value={{ coordinates, setCoordinates }}>
          <DialogInputCor open={open} setOpen={setOpen} />
          <Map />
        </DialogContext.Provider>
      </Grid>
    </Grid>
  );
};

