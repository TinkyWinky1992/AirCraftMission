import {useState} from 'react';
import { Grid } from '@mui/material';
import { MapLayout } from './Layouts/MapLayout/maplayout.component';
import { CoordinateButton, SaveOperationButton } from './components/Buttons';

import './App.css'
import { DetailsProvider, DialogSaveOperation } from './components';
function App() {
  const [open, setOpen] = useState(true);
  const [openSave, setOpenSave] = useState(false);
  return (
    <DetailsProvider>
      <Grid 
        container 
        direction="column" 
        alignItems="center"  
        justifyContent="center"  
        sx={{ margin: "10px", height: "100vh" ,}}  
        spacing={2}  
      >
        <Grid item>
          <MapLayout open={open} setOpen={setOpen}/>
        </Grid>

        <Grid 
          container 
          direction="row" 
          spacing={5}  
          alignItems="center"  
          justifyContent="center" 
          
          sx={{ marginTop: "1rem" , display: "flex"}}  

        >
          <Grid item>
            <SaveOperationButton setOpen={setOpenSave}/>
          </Grid>
          <Grid item>
            <CoordinateButton open={open} setOpen={setOpen}/>
          </Grid>
        </Grid>
        <DialogSaveOperation open={openSave} setOpen={setOpenSave}/>
      </Grid>
    </DetailsProvider>
  );
  
}

export default App;
