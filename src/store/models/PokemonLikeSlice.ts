import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonType } from './PokemonsSlice';

const initialState: PokemonType[] = [];

const PokemonLikeSlice = createSlice({
  name: 'likes',
  initialState: { pokemon: initialState },
  reducers: {
    likePokemon: (state, action: PayloadAction<PokemonType>) => {
      const likeNow = state.pokemon.find(pokemon => pokemon.id === action.payload.id);
      

      if (likeNow) {
        state.pokemon = state.pokemon.filter(pokemon => pokemon.id !== action.payload.id);
      } else {

        state.pokemon.push(action.payload);
      }
    },
  },
});

export const { likePokemon } = PokemonLikeSlice.actions;
export default PokemonLikeSlice.reducer;
