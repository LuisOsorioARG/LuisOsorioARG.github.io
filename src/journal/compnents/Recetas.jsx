import { useSelector } from 'react-redux';
import { Autocomplete, Fab, Link, Button, Grid, TextField, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon  from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export const Recetas = () => {

  const { active:note } = useSelector( state => state.journal ); 
  const { imageUrls } = note; 

  const title = "titulo"; 

  console.log("desde el nuevo componentes de Recetas:"); 



  return (
        <div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="receta" />}
          />

          <Fab size="small" color="green" aria-label="add">
            <AddIcon />
          </Fab>
          <Fab size="small" color="secondary" aria-label="edit">
            <EditIcon />
          </Fab>
          <Fab size="small" color="error" aria-label="edit">
            <DeleteIcon />
          </Fab>
        </div>
  );
}

const top100Films = [
  { label: 'Torta de 15 cm x 10 cm de alto', year: 1994 },
  { label: 'Torta de 18 cm x 10 cm de alto', year: 1994 },
  { label: 'Torta de 20 cm x 10 cm de alto', year: 1994 },
  { label: 'Torta de 22 cm x 10 cm de alto', year: 1994 },
];