import { configureStore } from '@reduxjs/toolkit'
import { pokemonSlicer } from './pokemonSlice'
export const store = configureStore({
    reducer: {
        pokemonSlicer
    }
})

