import { Box } from '@mui/system';
import { NavBar } from '../compnents/NavBar';
import { SideBar } from '../compnents/SideBar';
import { Toolbar } from "@mui/material"

const drawerWidth = 240; 

export const JournalLayout = ({ children }) => {

    return (

    <Box sx={{ display: 'flex'}}>

        {/* navbar */}

        <NavBar drawerWitdth={ drawerWidth }/>

        {/* Sidebar */}

        <SideBar drawerWitdth={ drawerWidth } />


        <Box component='main' sx={{ flexGrow: 1, p:1}}>

            {/* toolbar */}

            <Toolbar />
            
            { children }


        </Box>


    </Box>

    )



}