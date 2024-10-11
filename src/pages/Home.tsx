import { useEffect } from "react";
import Header from "../config/layout/Header";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getPokemons } from "../store/models/PokemonSlice";
import CardPokemon from "../components/Card-Pokemon/CardPokemon";
import { Box, Container, Grid2, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";



function Home() {

  const dispatch = useAppDispatch();
  const selector = useAppSelector(state => state.pokemon);

  useEffect(() => {
    dispatch(getPokemons());
    
    console.log(selector);
    
  }, []);

  return (
    <>
      <Header/>
      <Container sx={{marginTop: '100px'}}>
        <Grid2 container spacing={2}>


          
        <Box position={'absolute'} sx={{display:{xs: 'none', xl: 'flex'}}} left={225}>
        <IconButton aria-label="page-next" size="large">
              <ArrowBack fontSize="large" sx={{fontSize: '120px '}}/>
        </IconButton>
        </Box >
        <Box position={'absolute'} sx={{display:{xs: 'none', xl: 'flex'}}} right={225}>
        <IconButton aria-label="page-next" size="large">
              <ArrowForward fontSize="large" sx={{fontSize: '120px'}}/>
        </IconButton>
        </Box>
        
        {selector.pokemons.map(item => 
        <Grid2 size={{xs:4, md:2}}>
        <CardPokemon pokemon={item}/>
        </Grid2>
      )}
        

        <Box sx={{display:{xs: 'flex', xl: 'none'}}}>
        <IconButton aria-label="page-next" size="large" >
              <ArrowBack fontSize="large" sx={{fontSize: '120px '}}/>
        </IconButton>
        </Box >
        <Box sx={{display:{xs: 'flex', xl: 'none'}}}>
        <IconButton aria-label="page-next" size="large">
              <ArrowForward fontSize="large" sx={{fontSize: '120px'}}/>
        </IconButton>
        </Box>

        </Grid2>

       
      </Container>
    </>
  );
}

export default Home;
