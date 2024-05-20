import React, { useRef } from "react";
import "../app/styles/next-question-btn.css";
import { useDispatch, useSelector } from "react-redux";
import { IPostDiagnose, IPostDiagnoseState, postDiagnose, setDiagnoseResponse } from "../store/slices/post/diagnose";
import { RootState } from "../store/store";

const GetResultBtn: React.FC = () => {
    const dispatch = useDispatch(); 
    const symptoms = useSelector((state: RootState)=>state.diagnose.symptom_text);
    const getResultBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {

        const request: IPostDiagnose = {
            symptom_text: symptoms
        };
        type MyInterfaceType = Awaited<ReturnType<typeof postDiagnose>>;     
        const exampleFunction = (data: MyInterfaceType) => {
            const output: IPostDiagnoseState = {
                symptom_text: symptoms,
                disease_name: data.disease_name,
                disease_description: data.disease_description
            }
            dispatch(setDiagnoseResponse(output));
        };       
        postDiagnose(request).then(data => exampleFunction(data));
    }   
    return (
        // <form className="by-symptoms__form">
            <button className="by-symptoms__next-question-btn" onClick={getResultBtnHandler}>Get result</button>
        // </form>
    );
};

export default GetResultBtn;