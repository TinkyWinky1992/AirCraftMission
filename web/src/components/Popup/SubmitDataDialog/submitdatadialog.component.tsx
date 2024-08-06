import React, { useState } from "react";
import { DialogState } from "../../../types";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export const DialogInputCor: React.FC<DialogState> = ({ open, setOpen }) => {


    const handleClose = () => {
        setOpen(false);
    };





    return (
        <Dialog open={open} onClose={handleClose}>

        </Dialog>
    );
};
