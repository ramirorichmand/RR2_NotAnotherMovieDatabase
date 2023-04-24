import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    url: {},
    genres: {}
}

const MovieHomeSlice = createSlice({
    name: 'MovixHome',
    initialState,
    reducers:{
        getApiConfiguration(state, action){
            state.url = action.payload
        },
        getGenresConfig(state, action){
            state.genres = action.payload
        }
    }
})

export const {getApiConfiguration, getGenresConfig} = MovieHomeSlice.actions
export default MovieHomeSlice.reducer