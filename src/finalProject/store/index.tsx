import { configureStore } from "@reduxjs/toolkit";
import tunesReducer from "../Tunes/reducer";
export interface TroveState {
  tunesReducer: {
    tunes: any[];
  };
}
const store = configureStore({
  reducer: {
    tunesReducer
  }
});


export default store;