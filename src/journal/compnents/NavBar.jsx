import { useDispatch } from 'react-redux'
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { Grid, AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { startLogout } from '../../store/auth/thunks'; 

export const NavBar = ({drawerWitdth = 240}) => {

    //declaramos el dispach para utilizarlo luego...
    const dispatch = useDispatch(); 

    const onLogout = () => {

        //las tareas aqui son; por un lado des-loguearnos desde firebase
        //por otro actualizar el store
        //y por ultimo actualizar el dato que almaceno una vez que salgo del navegador
        dispatch( startLogout());

    }

    const onMenu = () => {

        console.log("Aprete el onMenu !!! ------> ")
    }


    return (

        <AppBar
            position='fixed'
            sx={{ 
                width:{ sm: `calc(100% - ${ drawerWitdth}px)` },
                ml: { sm: `${ drawerWitdth}px`},    
            }}
            >
            
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr:2, display: { sm: 'none'}}}    
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction = 'row' justifyContent='space-between' alignItems='center'>

                    <Typography variant='h6' noWrap component='div'> JournalAp 2</Typography>

                    <Typography onClick = { onMenu } variant='h6' noWrap component='div'> Materiales </Typography>

                    <IconButton color='error'>
                        <LogoutOutlined onClick = { onLogout } />
                    </IconButton>

                </Grid>

            </Toolbar>
        </AppBar>
    )


}