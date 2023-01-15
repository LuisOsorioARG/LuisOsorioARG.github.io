import { useDispatch, useSelector } from 'react-redux'; 
import { Grid, ListItemText, ListItemIcon, ListItemButton, ListItem, List,Divider, Drawer, Toolbar, Typography } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material";
import { useMemo } from 'react';
import { setActiveNote } from '../../store/journal/journalSlice'; 

export const SideBarItem = ({ title='', body, id, date, imageUrls = []}) => {


    const dispatch = useDispatch(); 

    const newTitle = useMemo( () => {
        return title.length > 17 
        ? title.substring(0,17) + '...'
        : title;
    },[ title ]);

    const tocarNota = () => {
        console.log("Toque una nota"); 
        dispatch( setActiveNote({ title, body, id, date, imageUrls })); 
    }

return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                        </ListItemIcon>
                            <Grid container 
                              onClick = { tocarNota }>
                                <ListItemText primary={ newTitle } />
                                <ListItemText secondary={ body } />
                            </Grid>
            </ListItemButton>
        </ListItem>
);
}