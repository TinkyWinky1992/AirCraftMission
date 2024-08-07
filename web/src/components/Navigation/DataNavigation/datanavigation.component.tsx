import React, {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBarLabel, DrawerNavigation } from "./NavigationComponents";
import Drawer from '@mui/material/Drawer';
export const DataNaivgation: React.FC = () => {
    const [openMenu, setOpenMenu] = useState(false);



    const toggleDrawerMenu = (newOpen: boolean) => () => {
        setOpenMenu(newOpen);
    };

    const darkTheme = createTheme({
        palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        },
    });

    return (
        <Stack spacing={1} sx={{ flexGrow: 1 } }>
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static" color="primary">
            <AppBarLabel label="Spectate Data" setOpen={setOpenMenu} />
            </AppBar>
            <Drawer
                anchor="right"
                    open={openMenu}
                    onClose={toggleDrawerMenu(false) }
                    >
                    <DrawerNavigation open={openMenu}  />
                    </Drawer>
        </ThemeProvider>
        </Stack>
    );
}
