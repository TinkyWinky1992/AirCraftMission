// App.tsx
import React, { useState } from 'react';
import { Map, DialogInputCor, DialogContext } from './components';
import { Grid } from '@mui/material';
import './App.css';

function App() {
  const [coordinates, setCoordinates] = useState<{ lat?: number; lng?: number, speed?: number, radius?: number}>({});

  return (
    <Grid container>
      <Grid item>
        <DialogContext.Provider value={{ coordinates, setCoordinates }}>
          <DialogInputCor />
          <Map />
        </DialogContext.Provider>
      </Grid>
    </Grid>
  );
}

export default App;
