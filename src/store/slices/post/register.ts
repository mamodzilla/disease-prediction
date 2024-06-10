import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";

export interface IPostRegisterState {
    nickname: string,
    email: string,
    password: string,
}

const initialPostRegisterState: IPostRegisterState = {
    "nickname": "",
		"email": "", 
		"password": ""
}

const postRegisterSlice = createSlice({
        name: "register",
        initialState: initialPostRegisterState,
        reducers: {
            setRegisterData : (state, action: PayloadAction<IPostRegisterState>) => {
                state.nickname = action.payload.nickname;
                state.email = action.payload.email;
                state.password = action.payload.password;
            }
        }
});

export const postRegisterReducer = postRegisterSlice.reducer;
export const {setRegisterData} = postRegisterSlice.actions; 

export interface IPostRegister {
  nickname: string,
  email: string,
  password: string
}

export const postRegister= async (data: IPostRegister) => {
    const response = await fetch('http://localhost:8010/register', 
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

export const usePostRegisterGetResult = () => {
    const nickname = useSelector((state:RootState)=>state.register.nickname)
    const email = useSelector((state: RootState)=>state.register.email);
    const password = useSelector((state: RootState)=>state.register.password);
    let isOK = false;
    const getResult = () => {      
        const request: IPostRegister = {
            nickname: nickname,
            email: email,
            password: password
        };
        postRegister(request).then((response) => {if (response.ok) {isOK = true}});
    }
    getResult();
    return isOK
}
