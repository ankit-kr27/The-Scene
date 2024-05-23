import { configureStore } from "@reduxjs/toolkit";
import breedsReducer from "../features/dogSlice.js"

export const store = configureStore({
    reducer: {
        breeds: breedsReducer
    }
})