import React, {Dispatch, SetStateAction} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';

export const AppBarLabel: React.FC<{ label: string, setOpen: Dispatch<SetStateAction<boolean>>}> = ({ label, setOpen}) => {

    const toggleDrawerMenu = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    
    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'flex-end', width: "100vw" }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                    <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
                        {label}
                    </Typography>
                    <IconButton edge="end" color="inherit" aria-label="menu" sx={{ mr: 2 }}  onClick={toggleDrawerMenu(true)}>
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
