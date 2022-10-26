import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from './redux/reducer'
import './App.css'
// import styles from './Counter.module.css'
export default function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          // onClick={() => dispatch(decrement())}
          onClick={() => {
            dispatch(incrementByAmount(500))
          }}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}