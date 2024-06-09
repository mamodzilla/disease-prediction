import React from "react";
import "../app/styles/next-question-btn.css";
import { useDispatch, useSelector } from "react-redux";
import { IPostDiagnose, IPostDiagnoseState, postDiagnose, setDiagnoseResponse } from "../store/slices/post/diagnose";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";

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
                diseases: data
            }
            dispatch(setDiagnoseResponse(output));
        };       
        postDiagnose(request).then(data => exampleFunction(data));
    }   
    return (
            <Link to="/result" className="result__form"><button className="by-symptoms__next-question-btn" onClick={getResultBtnHandler}>Get result</button></Link>
    );
};

export default GetResultBtn;