import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IPostLoginState {
    email: string;
    password: string;
    access_token: string;
    refresh_token: string
}

const initialPostLoginState: IPostLoginState = {
    email: "",
    password: "",
    access_token: "",
    refresh_token: ""
}

const postLoginSlice = createSlice({
        name: "login",
        initialState: initialPostLoginState,
        reducers: {
            setUserData : (state, action: PayloadAction<IPostLoginState>) => {
                state.email = action.payload.email;
                state.password = action.payload.password;
            },
            setTokens : (state, action: PayloadAction<IPostLoginState>) => {
                state.access_token = action.payload.access_token;
                state.refresh_token = action.payload.refresh_token;
            }
        }
});

export const postLoginReducer = postLoginSlice.reducer;
export const {setUserData, setTokens} = postLoginSlice.actions; 

export interface IPostLogin {
    email: string;
    password: string
}

export const postLogin= async (data: IPostLogin) => {
    const response = await fetch('http://localhost:8010/login', 
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resp: Promise<any> = await response.json();
    return resp;
};