import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
// import styles from './Counter.module.css'
export default function App() {
  // const useSelector(state => state)
  const dispatch = useDispatch()
  const { carNumber } = useSelector(state => state.car)
  const { numOfItems } = useSelector(state => state.cart)
  return (
    <div className='w-full  bg-slate-500 h-96 flex items-center justify-center	'>
      <p className="text-blue-700 text-center">

        this is call from car reducer---
        {carNumber}
        <br></br>
        this is call from cart reducer:---
        {numOfItems}
      </p>
    </div>
  )
}