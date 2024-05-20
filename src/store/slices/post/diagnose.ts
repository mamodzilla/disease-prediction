import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPostDiagnoseState {
    symptom_text: string;
    disease_name: string; 
    disease_description: string;
};

const initialPostDiagnoseState: IPostDiagnoseState = {
  symptom_text: "",
  disease_name: "",
  disease_description: ""
};

const postDiagnoseSlice = createSlice({
    name: 'diagnose',
    initialState: initialPostDiagnoseState,
    reducers: {
        setDiagnoseResponse: (state, action: PayloadAction<IPostDiagnoseState>) => {
            state.disease_name = action.payload.disease_name;
            state.disease_description = action.payload.disease_description;
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

/*diagnose (post)
req: 
{
    "symptom_text": ""
}
resp (200): 
{
    "disease_name": "",
    "disease_description": ""
}*/