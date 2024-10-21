import { useEffect, useState } from 'react';
import Header from '../config/layout/Header';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPokemons, PokemonType } from '../store/models/PokemonsSlice';
import CardPokemon from '../components/Card-Pokemon/CardPokemon';
import { Box, Container, Grid2, Typography } from '@mui/material';
import ButtonPage from '../components/Button-Page/ButtonPage';
import ButtonPageSmall from '../components/Button-Page-Small/ButtonPageSmall';
import ModalPokemon from '../components/Modal-Pokemon/ModalPokemon';
import Pokedex from '../assets/pokedex.webp';
import { Link } from 'react-router-dom';


function Home() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(state => state.pokemon);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<boolean>(false);
  const [getPokemon, setGetPokemon] = useState<PokemonType>();

  const limit = 16;
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
          <ButtonPage page="ArrowForward" action={handleNextPage} disabled={page === 83 ? true : false} />

          {selector.pokemons?.map(item => (
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Typography component={'div'} onClick={() => setGetPokemon(item)}>
                <CardPokemon pokemon={item} action={handleClickOpen} />
              </Typography>
            </Grid2>
          ))}
          <Box
            sx={{
              position: 'fixed',
              zIndex: 1000,
              right: '80px',
              top: '100px',
              '&:hover img': {
                transform: 'scale(1.1)', 
                animation: 'shake 0.3s ease-in-out', 
                transition: 'transform 0.3s ease-in-out',
              },
              '@keyframes shake': {
                '0%, 100%': { transform: 'translateX(0)' },
                '25%': { transform: 'translateX(-5px)' },
                '50%': { transform: 'translateX(5px)' },
                '75%': { transform: 'translateX(-5px)' },
              },

              '@media (max-width: 600px)': {
                right: '30px', 
                bottom: '50px',
                top: 'auto', 
                width: '80px', 
              },
            }}
          >
            <Link to="/pokedex">
              <img
                src={Pokedex}
                alt="Pokedex"
                style={{
                  width: '100%',
                  maxWidth: '150px',
                }}
              />
            </Link>
          </Box>

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
