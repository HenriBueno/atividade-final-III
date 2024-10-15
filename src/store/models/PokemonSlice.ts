import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import doGet from "../../services/api"

export interface PokemonType{
    id: string,
    name: string,
    abilities: [{ ability: { name: string, url: string }, is_hidden: boolean }],
    weight: number,
    sprites: { back_default: string, back_shiny: string, front_default: string, front_shiny: string, other: {"official-artwork": {front_default: string, front_shiny: string} },
    stats: [{ base_stat: number, stat: { name: string, url: string } }]
}
}

const initialState : PokemonType[] = []

export const getPokemons = createAsyncThunk('pokemons/getPokemons', async ({ offset, limit }: { offset: number; limit: number }) => {
    const results = await doGet(`pokemon/?offset=${offset}&limit=${limit}`);
    const pokemons: PokemonType[] = []
    for (const pokemon of results.results) {
        const response = await doGet (`pokemon/${pokemon.name}`)
        pokemons.push(response)
    }

    return pokemons
})


const pokemonsSlice = createSlice ({
    name: 'pokemon',
    initialState: { pokemons: initialState },
    reducers: {
        addPokemon: (state, action: PayloadAction<PokemonType>) => {
            state.pokemons.push({...action.payload })
            return state
        },
    },
    extraReducers(builder) {
        builder.addCase(getPokemons.fulfilled, (state, action) => {
          console.log('PAYLOAD', action.payload);
          state.pokemons = action.payload;
          return state;
        });
        builder.addCase(getPokemons.pending, state => {
          return state;
        });
        builder.addCase(getPokemons.rejected, state => {
          console.log('Erro!!');
          return state;
        });
      },
})

export const {addPokemon} = pokemonsSlice.actions
export default pokemonsSlice.reducer