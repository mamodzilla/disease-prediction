import { configureStore } from "@reduxjs/toolkit";
import { postDiagnoseReducer } from "./slices/post/diagnose";

const store = configureStore({
    reducer: {
        diagnose: postDiagnoseReducer
    }
}) 

export type RootState = ReturnType<typeof store.getState>; 
export default store;
