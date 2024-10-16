import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { PokemonType } from '../../store/models/PokemonsSlice';
import { Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

interface CardPokemonProps {
  pokemon: PokemonType;
  action: () => void;
  
}

export default function CardPokemon({ pokemon, action }: CardPokemonProps) {

  const [like, setLike] = useState<boolean>(false);


  function handleLike() {
    setLike(!like);
  }

 

  return (
    <Card
      sx={{
        '&:hover': {
          boxShadow: 'none', 
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.2)', 
          },
        },
      }}
    >
      <Box display="flex" justifyContent="end" width="100%">
        <IconButton aria-label="delete" size="small" onClick={handleLike}>
          <FavoriteIcon fontSize="medium" color={like ? 'warning' : 'inherit'} />
        </IconButton>
      </Box>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} onClick={action}>
        <CardMedia component="img" image={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pokemon.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
