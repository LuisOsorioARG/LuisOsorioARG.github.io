//importaciones de react
import { useEffect, useRef } from 'react';

//importaciones de Css
import Swal from 'sweetalert2'; 
import 'sweetalert2/dist/sweetalert2.css'; 

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, StarOutline, UploadFileOutlined } from '@mui/icons-material';
import { Link, Button, Grid, TextField, Typography, IconButton } from '@mui/material';

//componentes 
import { ImageGallery } from '../compnents/ImageGallery';
import { Recetas } from '../compnents/Recetas';

import { useForm } from '../../hooks/useForm'; 
import { setActiveNote } from '../../store/journal/journalSlice'; 

import { startDeletingNote, startSaveNote, startUpLoadingFiles } from '../../store/journal/thunks'; 

export const NoteView = () => {

    const dispatch = useDispatch(); 


    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal ); 

    const { body, title, date, onInputChange, formState} = useForm( note ); 

    const dataString = useMemo( () => {
        const newDate  = new Date( date ); 
        return newDate.toUTCString(); 
        }, [date]); 

    //esto lo hacemos para relacionar un icono con el componente de input
    //para que al tocar ese icono relacione el comportamiento con ese input 
    //que esta oculto.
    const fileInputReferencia = useRef(); 

    useEffect(() => {
        dispatch( setActiveNote( formState )); 
        },[formState]); 

    useEffect(() => {
        if ( messageSaved.length > 0)
            { 
                Swal.fire("Nota Salvada", messageSaved, 'success'); 
            }
        },[messageSaved]); 

    const onSaveNote = () => {
        dispatch ( startSaveNote() ); 
    }

    const onDelete = () => {
        dispatch ( startDeletingNote() ); 
    }
    
    
    const onFileInputChange = ( { target }) => {
        if ( target.files === 0) return; 

        //console.log(target.files); 

        dispatch( startUpLoadingFiles( target.files )); 

    }

    console.log("listado de imagenes:",note.imageUrls)

    return (
        <Grid
        container
        spacing={ 0 }
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 1}}>

            <Grid item >
                <Typography fontSize={39} fontWeight='light'> { dataString } </Typography>
            </Grid>

            <input
                type="file"
                multiple
                ref={ fileInputReferencia }
                onChange = { onFileInputChange }
                style={{ display: 'none'}}
            />

            <IconButton
                color="primary"
                disabled={ isSaving }
                onClick={ ()=> fileInputReferencia.current.click() }>
                   <UploadFileOutlined />
            </IconButton>

            <Grid item >
                <Button
                    onClick={ onSaveNote } 
                    color="primary" 
                    sx={{ padding:2}} >
                    <SaveOutlined sx={{ fontSize: 30, mr:1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container >
                <TextField
                    typer="text"
                    variant="filled"
                    fullWidth
                    placeholder='Ingresa un titulo'
                    label="Titulo"
                    sx={{ border: 'none', mb: 1}}
                    name="title"
                    value={ title }
                    onChange = { onInputChange }
                />
            </Grid>

            <Grid container >
                <TextField
                    typer="text"
                    variant="filled"
                    fullWidth
                    multiline
                    minRows={ 5 }
                    placeholder='Que sucedio hoy'
                    sx={{ border: 'none', mb: 1}}
                    name="body"
                    value={ body }
                    onChange = { onInputChange }
                />
            </Grid>

            <Grid container >
                <Recetas />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick = { onDelete }
                    sx={{ mt: 2}}
                    color="error">
                        <DeleteOutline />
                        Borrar
                </Button>
            </Grid>

            <ImageGallery
              imagenesPersonales={ note.imageUrls }
             />



        </Grid>
    )

}