import { useDispatch, useSelector } from 'react-redux'; 

import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'

import { MailOutline } from "@mui/icons-material";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView } from "../views/NothingSelectedView";
import { NoteView } from "../views/NoteView";
import { startNewNote } from '../../store/journal/thunks'; 


export const JournalPage = () => {
    
    
    //este es el estado del store y lo puedo consultar desde aqui.
    const { isSaving, active  } = useSelector( state => state.journal ); 

    const dispatch = useDispatch(); 

    const onClickNewNote = () => {
        dispatch( startNewNote()); 
    }
    
    return (
        <JournalLayout>

            {
                 ( !!active )
                ? <NoteView />
                : <NothingSelectedView />   
            }

            <IconButton
                disabled = { isSaving }
                onClick = { onClickNewNote }
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main',opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    botton: 50
                }}
            >
                <AddOutlined 
    
                    sx={{ fontSize: 50 }} />
                
            </IconButton>                

               {/* <NoteView /> */}


        </JournalLayout>
    );
}