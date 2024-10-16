import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { PokemonType } from '../../store/models/PokemonsSlice';
import { Box, CardMedia, Typography } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface ModalPokemonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pokemon?: PokemonType;
}

export default function ModalPokemon({ open, setOpen, pokemon }: ModalPokemonProps) {
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {pokemon?.name}
      </DialogTitle>
      <DialogContent>
        <Typography>#{pokemon?.id}</Typography>
        <Box>
          <CardMedia
            component="img"
            image={pokemon?.sprites.other['official-artwork'].front_default}
            alt={pokemon?.name}
            height="300px"
          />
        </Box>
        <Box>
          <Typography>Altura: {pokemon?.height}</Typography>
          <Typography>Peso: {pokemon?.weight}</Typography>
        </Box>
      </DialogContent>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={theme => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Fechar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
