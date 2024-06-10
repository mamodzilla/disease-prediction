import React, { useEffect } from "react";
import "../app/styles/next-question-btn.css";
import { IPostDiagnose, IPostDiagnoseState, postDiagnose, setDiagnoseResponse} from "../store/slices/post/diagnose";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

const GetResultBtn: React.FC = () => {
    const dispatch = useDispatch(); 
    const symptoms = useSelector((state: RootState)=>state.diagnose.symptom_text);
    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const getResult = () => {
            const request: IPostDiagnose = {
                symptom_text: symptoms
            };
            type MyInterfaceType = Awaited<ReturnType<typeof postDiagnose>>;     
            const exctract = (data: MyInterfaceType) => {
                const output: IPostDiagnoseState = {
                    symptom_text: symptoms,
                    diseases: data
                }
                dispatch(setDiagnoseResponse(output));
            };       
            postDiagnose(request).then(data => exctract(data));
        };
        getResult();  
    }

    return (
            <Link to="/result" className="result__form">
                <button className="by-symptoms__next-question-btn" onClick={clickHandler}>
                    Get result
                </button>
            </Link>
    );
};

export default GetResultBtn;