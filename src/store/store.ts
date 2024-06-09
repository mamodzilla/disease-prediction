import { configureStore } from "@reduxjs/toolkit";
import { postDiagnoseReducer } from "./slices/post/diagnose";
import { postLoginReducer } from "./slices/post/login";

const store = configureStore({
    reducer: {
        diagnose: postDiagnoseReducer,
        login: postLoginReducer
    }
}) 

export type RootState = ReturnType<typeof store.getState>; 
export default store;
