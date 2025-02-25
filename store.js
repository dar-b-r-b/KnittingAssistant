import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import dialogForCounterReducer from "./features/counter/dialogForCounterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    dialogForCounter: dialogForCounterReducer,
  },
});

export default store;
