import { configureStore } from "@reduxjs/toolkit";
import { postDiagnoseReducer } from "./slices/post/diagnose";
import { postLoginReducer } from "./slices/post/login";
import { getUserProfileReducer } from "./slices/get/user/profile";
import { postRegisterReducer } from "./slices/post/register";
import { postRefreshReducer } from "./slices/post/refresh_tokens";

const store = configureStore({
    reducer: {
        diagnose: postDiagnoseReducer,
        login: postLoginReducer,
        user_profile: getUserProfileReducer,
        register: postRegisterReducer,
        refresh: postRefreshReducer
    }
}) 

export type RootState = ReturnType<typeof store.getState>; 
export default store;
