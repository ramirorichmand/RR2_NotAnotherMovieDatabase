import { configureStore } from "@reduxjs/toolkit";
import MovieHomeSlice from "../slices/MovieHomeSlice";



export const store = configureStore({
    reducer:{
        MovieHome: MovieHomeSlice
    }
})