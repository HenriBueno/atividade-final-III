import { useEffect, useState } from 'react';
import Header from '../config/layout/Header';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPokemons, PokemonType } from '../store/models/PokemonsSlice';
import CardPokemon from '../components/Card-Pokemon/CardPokemon';
import { Box, CircularProgress, Container, Grid2, Typography } from '@mui/material';
import ButtonPage from '../components/Button-Page/ButtonPage';
import ButtonPageSmall from '../components/Button-Page-Small/ButtonPageSmall';
import ModalPokemon from '../components/Modal-Pokemon/ModalPokemon';

function Home() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(state => state.pokemon);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<boolean>(false);
  const [getPokemon, setGetPokemon] = useState<PokemonType>();


  const limit = 24;
  const offset = (page - 1) * limit;

  useEffect(() => {
    dispatch(getPokemons({ offset, limit }));

    console.log(selector);
  }, [dispatch, page]);


  const handleNextPage = () => {
    setPage(page => page + 1);
  };

  const handleBackPage = () => {
    if (page > 1) {
      setPage(page => page - 1);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Header />
      <Container sx={{ marginTop: '100px' }}>
        <Grid2 container spacing={2} sx={{ alignItems: 'center' }}>
          <ModalPokemon open={open} setOpen={setOpen} pokemon={getPokemon} />
          <ButtonPage page="arrowback" action={handleBackPage} disabled={page === 1 ? true : false} />
          <ButtonPage page="ArrowForward" action={handleNextPage} disabled={page === 55 ? true : false} />

          {selector.pokemons.map(item => (
            <Grid2 size={{ xs: 4, md: 2 }}>
              <Typography component={'div'} onClick={() => setGetPokemon(item)}>
                <CardPokemon pokemon={item} action={handleClickOpen} />
              </Typography>
            </Grid2>
          ))}

          <Box
            sx={{
              width: '100%',
              display: { xs: 'flex', xl: 'none' },
              justifyContent: 'space-evenly',
              alignContent: 'center',
            }}
          >
            <ButtonPageSmall action={handleBackPage} page="arrowback" disabled={page === 1 ? true : false} />
            <h3>Página: {page}</h3>
            <ButtonPageSmall action={handleNextPage} page="ArrowForward" disabled={page === 55 ? true : false} />
          </Box>
        </Grid2>
      </Container>
    </>
  );
}

export default Home;
