import { combineReducers } from '@reduxjs/toolkit';
import PokemonSlice from './PokemonsSlice';


export default combineReducers({
    pokemon: PokemonSlice
});
