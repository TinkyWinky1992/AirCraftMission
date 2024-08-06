import React, {Dispatch, SetStateAction} from 'react';
import { Grid, Typography } from '@mui/material';
import { useDetailsContext } from '../../map';
import './saveoperationbtn.style.css';
interface SaveOperationButtonProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}


export const SaveOperationButton: React.FC<SaveOperationButtonProps> = ({setOpen}) => {
  const { enemyDetails } = useDetailsContext();

  const OnHandleClick = () => {
    if(enemyDetails?.lat == null)
        return;

    setOpen(true);
  };

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
          Save Operation
        </Typography>
      </Grid>
      <Grid item>
        <button className="btngreen-class-name" onClick={OnHandleClick}>
          <span className="back"></span>
          <span className="front"></span>
        </button>
      </Grid>
    </Grid>
  );
};
