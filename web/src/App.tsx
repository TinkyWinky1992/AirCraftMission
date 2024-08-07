import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { MapLayout } from './Layouts/MapLayout/maplayout.component';
import { CoordinateButton, SaveOperationButton, DetailsProvider, DialogSaveOperation, DataNaivgation } from './components';
import { CSSTransition } from "react-transition-group";
import './App.css';

function App() {
  const [open, setOpen] = useState(true);
  const [openSave, setOpenSave] = useState(false);
  const [isCoordination, setIsCoordination] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCoordination(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isCoordination]);

  return (
    <Grid container  sx={{ height: '100vh'}}>
      <DetailsProvider>
        <Grid item>
          <DataNaivgation />
        </Grid>
        <Grid 
          container 
          direction="column" 
          alignItems="center"  
          justifyContent="center"  
          sx={{ margin: "10px", position: 'relative', padding: "2rem"}}  
          spacing={1}
        >
          <Grid item   >
            <MapLayout open={open} setOpen={setOpen}/>
          </Grid>

          <Grid 
            container 
            direction="row" 
            spacing={5}  
            alignItems="center"  
            justifyContent="center" 
            sx={{ marginTop: "1rem", display: "flex", padding: "0.5rem" }}  
          >
            <Grid item>
              <SaveOperationButton setOpen={setOpenSave} setIsCoordination={setIsCoordination}/>
            </Grid>
            <Grid item>
              <CoordinateButton open={open} setOpen={setOpen}/>
            </Grid>
          </Grid>
          <DialogSaveOperation open={openSave} setOpen={setOpenSave}/>

          {/* Adjust position and ensure it does not overlap with other elements */}
          <CSSTransition
            in={isCoordination}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <Grid item xs={12} sx={{ position: 'absolute', bottom: 10, width: '100%', textAlign: 'center', padding: '0 10px' }}>
              <Typography variant="h6" sx={{ color: 'red' }} gutterBottom>
                You didn't submit any coordination of your Target
              </Typography>
            </Grid>
          </CSSTransition>
        </Grid>
      </DetailsProvider>
    </Grid>
  );
}

export default App;
