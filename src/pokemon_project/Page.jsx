import React from "react";
import { Provider } from "react-redux";
import store from "./pokemon/store.js";
export default function Page() {
  return (
    <Provider store={store}>
      <div>page pokemon</div>
    </Provider>
  );
}
