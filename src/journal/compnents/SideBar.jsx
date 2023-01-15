import { useSelector } from 'react-redux'
import { Grid, ListItemText, ListItemIcon, ListItemButton, ListItem, List,Divider, Drawer, Toolbar, Typography } from "@mui/material"
import { Box, boxSizing } from "@mui/system";
import { TurnedInNot } from "@mui/icons-material";
import { SideBarItem } from './SideBarItem';

export const SideBar = ({ drawerWidth = 240 }) => {


    //este es el estado del store y lo puedo consultar desde aqui.
    const { displayName } = useSelector( state => state.auth ); 
    const { notes  } = useSelector( state => state.journal ); 

    return (

        <Box
            component='nav'
            sx={{ width: {sm: drawerWidth},
                    flexShrink: { sm:0}            
        }}>
            
            <Drawer 
                variant='permanent'
                open={true}
                sx={{ display: {xs: 'block'},
                  '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
                }}
            >

                <Toolbar>

                    <Typography variant='h6' noWrap component='div'>
                        { displayName }
                    </Typography>

                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map( note => (
                            <SideBarItem 
                                key={ note.id } 
                                { ...note }
                                />
                        ) )
                    }
                </List>
            </Drawer>   
        </Box>





    )


}