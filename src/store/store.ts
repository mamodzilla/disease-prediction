import { configureStore } from "@reduxjs/toolkit";
import { postDiagnoseReducer } from "./slice";

const store = configureStore({
    reducer: {
        diagnose: postDiagnoseReducer
    }
}) 

export type RootState = ReturnType<typeof store.getState>; 
export default store;
