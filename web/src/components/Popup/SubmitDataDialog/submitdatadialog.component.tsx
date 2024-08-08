import React, { useState } from "react";
import { DialogState } from "../../../types";
import Dialog from '@mui/material/Dialog';
import  { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useDetailsContext } from '../../map';
import { postOperation } from "../../../Service";
export const DialogSaveOperation: React.FC<DialogState> = ({ open, setOpen }) => {
    const [value, setValue] = useState<Dayjs | null>(null);
    const { friendlyAircraft ,enemyDetails } = useDetailsContext();
    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveOperation = async () => {
        const friendlyAircraftArray = friendlyAircraft ? [friendlyAircraft] : [];
    

        if (enemyDetails) {
            try{
                await postOperation(friendlyAircraftArray, enemyDetails, value?.toDate() ?? new Date());
                setOpen(false);
            }catch(error){
                console.log(error)
            }

        } else {
          console.error('Enemy details are required');
        }
      };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiDialog-paper': {
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: 24,
                },
            }}
        >
            <DialogTitle>Enter Date and Time</DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={2}>
                        <DateTimePicker
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                        <Typography variant="body1">
                            Stored value: {value == null ? 'null' : value.format('YYYY-MM-DD HH:mm:ss')}
                        </Typography>
                    </Stack>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveOperation} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
