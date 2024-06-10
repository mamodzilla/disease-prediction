import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

export interface ISingleDiagnose {
    disease_name: string; 
    disease_description: string;
}

export interface IPostDiagnoseState {
    symptom_text: string;
    diseases: ISingleDiagnose[];   
};

const initialPostDiagnoseState: IPostDiagnoseState = {
  symptom_text: "",
  diseases: []
};

const postDiagnoseSlice = createSlice({
    name: 'diagnose',
    initialState: initialPostDiagnoseState,
    reducers: {
        setDiagnoseResponse: (state, action: PayloadAction<IPostDiagnoseState>) => {
            state.diseases = action.payload.diseases;
        },
        setSymptomText: (state, action: PayloadAction<string>) => {
            state.symptom_text = action.payload
        }
    }
});

export const postDiagnoseReducer = postDiagnoseSlice.reducer;
export const {setDiagnoseResponse, setSymptomText} = postDiagnoseSlice.actions; 

export interface IPostDiagnose {
    symptom_text: string;
}

export const postDiagnose= async (data: IPostDiagnose) => {
      const response = await fetch('http://localhost:8010/diagnose', 
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
