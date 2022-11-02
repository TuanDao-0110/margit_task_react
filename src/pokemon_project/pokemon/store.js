import { configureStore } from '@reduxjs/toolkit'
import { pokemonSlicer } from './pokemonSlice'
const store = configureStore({
    reducer: {
        pokemonSlicer
    }
})


export default store