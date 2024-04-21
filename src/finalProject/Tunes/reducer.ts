import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tunes:<any>[],
    tune: {name:"", type:"", aliases:[], comments:[], sets:[]}
};

const tunesSlice = createSlice({
    name: "tunes",
    initialState,
    reducers: {
        
        setTune: (state, action) => {state.tune = action.payload},
        setTunes: (state, action) => {state.tunes = action.payload},
        addTune: (state, action) => {
            state.tunes = [
              { ...action.payload, _id: new Date().getTime().toString() },
                ...state.tunes,
            ];
        },
        deleteTune: (state, action) => {
            state.tunes = state.tunes.filter(
            (tune:any) => tune._id !== action.payload
            );
        },
        updateTune: (state, action) => {
            state.tunes = state.tunes.map((tune:any) => {
                if (tune._id === action.payload._id) {
                    return action.payload;
                } else {
                    return tune;
                }
            });
        },
    },
  });
  
  
  export const { addTune, deleteTune,
    updateTune, setTunes, setTune} = tunesSlice.actions;
  export default tunesSlice.reducer;