import { useState } from 'react';
import Header from '../config/layout/Header';
import { useAppSelector } from '../store/hooks';
import { PokemonType } from '../store/models/PokemonsSlice';
import { Container, Grid2, Typography } from '@mui/material';
import ModalPokemon from '../components/Modal-Pokemon/ModalPokemon';
import CardPokemon from '../components/Card-Pokemon/CardPokemon';


function Pokedex() {
  const [open, setOpen] = useState<boolean>(false);
  const [getPokemon, setGetPokemon] = useState<PokemonType>();
  const selectorLikes = useAppSelector(state => state.likes);

  const handleClickOpen = () => {
    setOpen(true);
  };


  return (
    <>
      <Header />
      <Container sx={{ marginTop: '100px' }}>
        <Grid2 container spacing={2} sx={{ alignItems: 'center' }}>
          <ModalPokemon open={open} setOpen={setOpen} pokemon={getPokemon} />
          {selectorLikes.pokemon?.map(item => (
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Typography component={'div'} onClick={() => setGetPokemon(item)}>
                <CardPokemon pokemon={item} action={handleClickOpen} />
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  );
}

export default Pokedex;
