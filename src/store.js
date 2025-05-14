import { configureStore } from "@reduxjs/toolkit";
import weatherApiSliceReducer from "./weatherApiSlice"
//import the nedded slices

export default configureStore({
    reducer:{weather:weatherApiSliceReducer},
})