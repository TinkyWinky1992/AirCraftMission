import React, { useState } from 'react';
import { Map, DialogInputCor, DialogContext } from '../../components';
import { Grid } from '@mui/material';
import './maplayout.style.css';
import { Coordinates, DialogState } from '../../types';

export const MapLayout: React.FC<DialogState> = ({ open, setOpen }) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  return (
    <Grid container>
      <Grid item className='layout'>
        <DialogContext.Provider value={{ coordinates, setCoordinates }}>
          <DialogInputCor open={open} setOpen={setOpen} />
          <Map />
        </DialogContext.Provider>
      </Grid>
    </Grid>
  );
};

