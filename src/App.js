import React from 'react'
import AnimalPage from './animal_project/Animal_page'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Template from './template/Template'
import Pokemon from './pokemon_project/Pokemon'
// import styles from './Counter.module.css'
export default function App() {
  // const useSelector(state => state)

  return (
    <Routes>
      <Route path='/' element={<Template></Template>}>

        <Route path='animal' element={<AnimalPage></AnimalPage>}></Route>
        <Route path='pokemon' element={<Pokemon></Pokemon>}></Route>

      </Route>

    </Routes>
  )
}