import { useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import { Link, Button, Grid, TextField, Typography, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';



const formData = {
    email: '',
    password: '',
    displayName: ''
}

//creamos las validaciones de cada campo como un vector
const formValidations = {
    email: [ (value) => value.includes('@'),'El correo debe tener al menos @'],
    password: [ (value) => value.length >= 6,'La clave debe ser mayor a 5 caracteres'],
    displayName: [ (value) => value.length >= 1,'El nombre debe ser obligatorio'],
}

export const RegisterPage = () => {

    const dispatch = useDispatch();
    
    //este es el estado del store y lo puedo consultar desde aqui.
    const { status, errorMessage } = useSelector( state => state.auth ); 

    const [ formSumitted, setFormSubmitted ] = useState(false); 
    const isCheckingAuthentication = useMemo( () => status === 'checking',[status]); 

    const { formState, displayName, email, password, onInputChange, 
            isFormValid,displayNameValid,emailValid,passwordValid} = useForm(formData,formValidations);

    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted(true); 
        if (!isFormValid) return; 
        dispatch( startCreatingUserWithEmailPassword(formState));
    }

    return (
        <AuthLayout title="pagina de registro">
                <h1> Formvalid { isFormValid ? 'Valido' : 'Incorrecto' } </h1>
                <form onSubmit={ onSubmit } className = 'animate__animated animate__fadeIn animate__faster' >
                    <Grid container>
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField 
                                label="Nombre" 
                                type="text" 
                                placeholder='Luis Osorio'
                                fullWidth
                                name="displayName"
                                value={ displayName }
                                onChange = { onInputChange }
                                error= { !!displayNameValid && formSumitted }
                                helperText= { displayNameValid }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField 
                                label="Correo" 
                                type="email" 
                                placeholder='correo@google.com'
                                fullWidth
                                name="email"
                                value={ email }
                                onChange = { onInputChange }
                                error= { !!emailValid && formSumitted }
                                helperText= { emailValid }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sx={{ mb: 2, mt: 1}}>
                            <TextField 
                                label="Contraseña" 
                                type="password" 
                                placeholder='contraseña'
                                fullWidth
                                name="password"
                                value={ password }
                                onChange = { onInputChange }
                                error= { !!passwordValid && formSumitted}
                                helperText= { passwordValid }
                            />
                        </Grid>
                        <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                            <Grid 
                                item 
                                xs={ 12 }
                                display={ !!errorMessage ? '': 'none'}>
                                <Alert severity='error'>{errorMessage}</Alert>
                            </Grid>
                            <Grid item xs={ 12 }>
                                <Button 
                                    disabled = { isCheckingAuthentication }
                                    type="submit" 
                                    variant='contained' 
                                    fullWidth>
                                    Crear
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container direction='row' justifyContent='end'>
                            <Typography sx={{mr:1}}>Ya tenes cuenta?</Typography>
                            <Link component={ RouterLink } color='inherit' to="/auth/login">
                               Ingresar
                            </Link>
                        </Grid>

                    </Grid>

                </form>

        </AuthLayout>
    );
}