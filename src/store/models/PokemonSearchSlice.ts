import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonType } from '../models/PokemonsSlice';
import doGet from '../../services/api';
import { useAppSelector } from '../hooks';

interface PokemonListResponse {
  results: { name: string; url: string }[]; // Ajuste conforme a API retorna
}

const initialState: PokemonType[] = [];


export const getPokemonSearch = createAsyncThunk('pokemon/getPokemonSearch', async (search: string) => {
  const firstResponse: PokemonListResponse = await doGet(`/pokemon/?&limit=1302`);
  const response: PokemonType[] = [];

  if (search.length > 2) {
    const filter = firstResponse.results.filter(pokemon =>
      pokemon.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );

    const promises = filter.map(pokemon => doGet(`/pokemon/${pokemon.name}`));
    const pokemons = await Promise.all(promises);

    return pokemons;
  }
  return [];
});

const PokemonSearchSlice = createSlice({
  name: 'pokemonSearch',
  initialState: { poke: initialState, loading: false },
  reducers: {
    addSearchPokemon: (state, action: PayloadAction<PokemonType>) => {
      state.poke.push({ ...action.payload });
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPokemonSearch.fulfilled, (state, action) => {
      state.poke = action.payload;
      state.loading = false;
    });
    builder.addCase(getPokemonSearch.rejected, (state, action) => {
      console.error(action.error);
      state.loading = false;
    });
    builder.addCase(getPokemonSearch.pending, state => {
      state.loading = true;
    });
  },
});

export const { addSearchPokemon } = PokemonSearchSlice.actions;
export default PokemonSearchSlice.reducer;
