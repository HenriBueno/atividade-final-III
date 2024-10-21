
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CardMedia, LinearProgress, Typography, Grid} from '@mui/material';
import { PokemonType } from '../../store/models/PokemonsSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface LinearProgressWithLabelProps {
  value: number;
  max: number;
}

function LinearProgressWithLabel({ value, max }: LinearProgressWithLabelProps) {
  const sizeBar = (value / max) * 100;

  return <LinearProgress variant="determinate" value={sizeBar} />;
}

interface StatsProps {
  pokemon: PokemonType;
  maxBarValue: number;
}

export function Stats({ pokemon, maxBarValue }: StatsProps) {
  return (
    <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center">
      <Typography marginBottom="20px">Status:</Typography>
      <Grid container spacing={1}>
        {pokemon.stats.map((stat, index) => (
          <Grid item xs={12} key={index} component="div">
            <Grid container alignItems="center" component="div">
              <Grid item xs={6} component="div" display="flex" justifyContent="end" marginRight="10px">
                <Typography>
                  {stat.stat.name}: {stat.base_stat}
                </Typography>
              </Grid>
              <Grid item xs={2} component="div">
                <LinearProgressWithLabel value={stat.base_stat} max={maxBarValue} />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

interface ModalPokemonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pokemon?: PokemonType;
}

export default function ModalPokemon({ open, setOpen, pokemon }: ModalPokemonProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const ValueMaxSizeBar = 300;

  return (
    <>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'center' }} id="customized-dialog-title">
          {pokemon?.name}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            #{pokemon?.id}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              image={pokemon?.sprites.other?.['official-artwork'].front_default}
              alt={pokemon?.name}
              sx={{
                width: '400px',
                height: '200px',
                objectFit: 'contain'
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box>
              <Typography>Altura:</Typography>
              <Typography>{pokemon?.height}</Typography>
            </Box>
            <Box>
              <Typography>Peso:</Typography>
              <Typography>{pokemon?.weight}</Typography>
            </Box>
            <Box>
              <Typography>Habilidades: </Typography>
              {pokemon?.abilities.map((item, index) => <Typography key={index}>{item.ability.name}</Typography>)}
            </Box>
          </Box>
          {pokemon && <Stats pokemon={pokemon} maxBarValue={ValueMaxSizeBar} />}
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
      </BootstrapDialog>
    </>
  );
}
