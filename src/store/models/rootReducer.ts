import { combineReducers } from '@reduxjs/toolkit';
import PokemonSlice from './PokemonsSlice';
import PokemonLikeSlice from './PokemonLikeSlice';
import PokemonSearchSlice from './PokemonSearchSlice';


export default combineReducers({
    pokemon: PokemonSlice,
    likes: PokemonLikeSlice,
    pokemonSearch: PokemonSearchSlice
});
