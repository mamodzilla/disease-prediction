import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export interface IGetUserProfileState {
    "nickname": string,
    "email": string,
	"password": string,
	"birth_date": string,
	"gender": string,
	"marital_status": string,
	"having_children": boolean,
	"job": string,
	"location": string
}

const initialGetUserProfileState: IGetUserProfileState = {
    "nickname": "",
	"email": "",
	"password": "",
	"birth_date": "",
	"gender": "",
	"marital_status": "",
	"having_children": false,
	"job": "",
	"location": ""
}

const getUserProfileSlice = createSlice({
        name: "user_profile",
        initialState: initialGetUserProfileState,
        reducers: {
            setUserInfo : (state, action: PayloadAction<IGetUserProfileState>) => {
                state.nickname = action.payload.nickname;
                state.email = action.payload.email;
                state.password = action.payload.password;
                state.birth_date = action.payload.birth_date;
                state.gender = action.payload.gender;
                state.marital_status = action.payload.marital_status;
                state.having_children = action.payload.having_children;
                state.location = action.payload.location;
            }
        }
});

export const getUserProfileReducer = getUserProfileSlice.reducer;
export const {setUserInfo} = getUserProfileSlice.actions; 

export const getUserProfile= async (access_token: string | undefined) => {
    const response = await fetch('http://localhost:8010/user/profile', 
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });
    const resp: Promise<any> = await response.json();
    return resp;
};

export const useGetUserProfileGetResult = (access_token: string | undefined) => {
    const dispatch = useDispatch(); 
    const getResult = () => {
        type MyInterfaceType = Awaited<ReturnType<typeof getUserProfile>>;     
        const exampleFunction = (data: MyInterfaceType) => {
            const output: IGetUserProfileState = {
                nickname : data.nickname,
                email : data.email,
                password : data.password,
                birth_date : data.birth_date,
                gender : data.gender,
                marital_status : data.marital_status,
                having_children : data.having_children,
                job : data.job,
                location : data.location,
            }
            dispatch(setUserInfo(output));
        }
        getUserProfile(access_token).then(data => exampleFunction(data));
    }
    getResult();
}