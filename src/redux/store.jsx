import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer";
import carReducer from "./carReducer";

const store = configureStore({ reducer: { cart: cartReducer, car: carReducer } });

export default store;
