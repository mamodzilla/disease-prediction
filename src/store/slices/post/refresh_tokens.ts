import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

export interface IPostRefreshState {
    access_token: string;
    refresh_token: string
}

const initialPostRefreshState: IPostRefreshState = {
    access_token: "",
    refresh_token: ""
}

const postRefreshSlice = createSlice({
        name: "refresh",
        initialState: initialPostRefreshState,
        reducers: {
            setTokens : (state, action: PayloadAction<IPostRefreshState>) => {
                state.access_token = action.payload.access_token;
                state.refresh_token = action.payload.refresh_token;
            },
            setRefreshToken: (state, action: PayloadAction<string>) => {
                state.refresh_token = action.payload;
            }
        }
});

export const postRefreshReducer = postRefreshSlice.reducer;
export const {setTokens, setRefreshToken} = postRefreshSlice.actions; 

export interface IPostRefresh {
    refresh_token: string
}

export const postRefresh = async (data: IPostRefresh) => {
    const response = await fetch('http://localhost:8010/refresh-tokens', 
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

export const usePostRefreshGetResult = async () => {
    const refresh_token = useSelector((state: RootState)=>state.refresh.refresh_token);
    const getResult = async () => {
        const request: IPostRefresh = {
            refresh_token: refresh_token,
        };
        type MyInterfaceType = Awaited<ReturnType<typeof postRefresh>>;     
        const extract = (data: MyInterfaceType) => {
            const output: IPostRefreshState = {
                access_token: data.access_token,
                refresh_token: data.refresh_token
            }
            localStorage.setItem("access_token", output.access_token);
            document.cookie = `refresh_token=${output.refresh_token}`;
        }
        await postRefresh(request).then(data => extract(data));
    }
    await getResult();
    const isAuthorized = true;
    return isAuthorized;
}