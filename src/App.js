import React from 'react'
import AnimalPage from './animal_project/Animal_page'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Template from './template/Template'
import Pokemon from './pokemon_project/Pokemon'
import FormPage from './form/FormPage'
import SpeedGame from './speed_game/SpeedGame_Page'
import Page from './otherspeedgame/Page'
import PokemonDetails from './pokemon_project/PokemonDetails'
import JsonPage from './json_server_project/Page'
// import styles from './Counter.module.css'
export default function App() {
  // const useSelector(state => state)

  return (
    <Routes>
      <Route path='/' element={<Template></Template>}>
        <Route path='animal' element={<AnimalPage></AnimalPage>}></Route>
        <Route path='pokemon' >
          <Route index element={<Pokemon></Pokemon>} />
          <Route path=':id' element={<PokemonDetails></PokemonDetails>}></Route>
        </Route>
        <Route path='formtask' element={<FormPage></FormPage>}></Route>
        <Route path='speedgame' element={<SpeedGame></SpeedGame>}></Route>
        <Route path='other' element={<Page></Page>}></Route>
        <Route path='json_server' element={<JsonPage></JsonPage>}></Route>

      </Route>
      <Route path='*' element={<Template></Template>} replace></Route>
    </Routes>
  )
}