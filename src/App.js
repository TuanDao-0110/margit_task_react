import React from 'react'
import AnimalPage from './animal_project/Animal_page'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Template from './template/Template'
import Pokemon from './pokemon_project/Pokemon'
import FormPage from './form/FormPage'
import SpeedGame_Page from './speed_game/SpeedGame_Page'
// import styles from './Counter.module.css'
export default function App() {
  // const useSelector(state => state)

  return (
    <Routes>
      <Route path='/' element={<Template></Template>}>

        <Route path='animal' element={<AnimalPage></AnimalPage>}></Route>
        <Route path='pokemon' element={<Pokemon></Pokemon>}></Route>
        <Route path='formtask' element={<FormPage></FormPage>}></Route>
        <Route path='speedgame' element={<SpeedGame_Page></SpeedGame_Page>}></Route>

      </Route>

    </Routes>
  )
}