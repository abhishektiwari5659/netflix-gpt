import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGpt: false,
        movieResults: null,
        movieNames: null
    },
    reducers:{
        toggleGpt: (state) => {
            state.showGpt = !state.showGpt;
        },
        addMovieResult: (state, action) =>{
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        }
    }
});

export const { toggleGpt, addMovieResult } = gptSlice.actions;
export default gptSlice.reducer;
