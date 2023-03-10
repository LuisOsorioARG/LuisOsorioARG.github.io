import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Link, Button, Grid, TextField, Typography, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';

import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';

const initialFormX = {
    email:'',
    password: ''
}

export const LoginPage = () => {

    //este es el estado del store y lo puedo consultar desde aqui.
    const { status, errorMessage  } = useSelector( state => state.auth ); 

    //declaramos el dispach para utilizarlo luego...
    const dispatch = useDispatch(); 

    const { email, password, onInputChange } = useForm( initialFormX );

    const isAuthenticated = useMemo( () => status === 'checking', [status]);

    const onSubmit = ( event ) => {
        event.preventDefault();
        dispatch( startLoginWithEmailPassword({email, password})); 
    }

    const onGoogleSingIn = () => {
        dispatch( startGoogleSignIn());
    }


    return (
        <AuthLayout title="login">
                <form onSubmit={ onSubmit } className = 'animate__animated animate__fadeIn animate__faster' >
                    <Grid container>
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField 
                                label="Correo" 
                                type="email" 
                                placeholder='correo@google.com'
                                fullWidth
                                name="email"
                                value={ email }
                                onChange={ onInputChange }
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
                                onChange={ onInputChange }

                            />
                        </Grid>

                        <Grid container spacing={ 2 } sx={{ mb:2, mt: 1 }}>

                            <Grid 
                                item 
                                xs={ 12 }
                                display={ !!errorMessage ? '': 'none'}>
                                <Alert severity='error'>{errorMessage}</Alert>
                            </Grid>

                            <Grid item xs={ 12 } sm={ 6 }>
                                <Button 
                                    disabled = { isAuthenticated }
                                    type="submit" 
                                    variant='contained' 
                                    fullWidth>
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 }>
                                <Button 
                                    disabled = { isAuthenticated }
                                    variant='contained' 
                                    fullWidth
                                    onClick={ onGoogleSingIn }>
                                    <Google />
                                    <Typography sx={{ ml:1 }}>Google</Typography>
                                </Button>
                            </Grid>
                            
                            <Grid container direction='row' justifyContent='end'>
                                <Link component={ RouterLink } color='inherit' to="/auth/register">
                                Crear una cuenta
                                </Link>
                            </Grid>
                        </Grid>

                    </Grid>

                </form>

        </AuthLayout>
    );
}