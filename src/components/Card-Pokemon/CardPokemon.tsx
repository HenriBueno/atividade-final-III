import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { PokemonType } from '../../store/models/PokemonsSlice';
import { Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { likePokemon } from '../../store/models/PokemonLikeSlice';


interface CardPokemonProps {
  pokemon?: PokemonType;
  action: () => void;
}

export default function CardPokemon({ pokemon, action }: CardPokemonProps) {
  const dispatch = useAppDispatch();
  const likeSelector = useAppSelector(state => state.likes);

  const alreadyLiked = likeSelector.pokemon.find(item => item.id === pokemon?.id);
  const [like, setLike] = useState<boolean>(!!alreadyLiked);

  useEffect(() => {
    setLike(!!alreadyLiked);
  }, [alreadyLiked]);

  function handleLike() {
    if (pokemon) {
      dispatch(likePokemon(pokemon));
      setLike(!like);
    }
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
      <Box display="flex" justifyContent="space-between" width="100%">
        <Typography gutterBottom variant="h6" component="div" marginLeft="30px">
          {pokemon?.name || 'Erro ao encontrar Pokemon'}
        </Typography>

        <IconButton aria-label="favorite" size="small" onClick={handleLike} sx={{ marginRight: '20px' }}>
          <FavoriteIcon fontSize="medium" color={like ? 'warning' : 'inherit'} />
        </IconButton>
      </Box>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} onClick={action}>
        <CardMedia
          component="img"
          image={pokemon?.sprites?.other?.['official-artwork']?.front_default || 'Erro ao encontrar Pokemon'}
          alt={pokemon?.name || 'Erro ao encontrar Pokemon'}
          sx={{
            width: '130px',
            height: '200px',
            objectFit: 'contain',
          }}
        />
      </CardActionArea>
    </Card>
  );
}
