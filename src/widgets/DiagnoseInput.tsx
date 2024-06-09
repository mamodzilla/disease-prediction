import React, { ChangeEvent, useRef } from "react";
import "../app/styles/question.css";
import { useDispatch } from "react-redux";
import { setSymptomText } from "../store/slices/post/diagnose";

const DiagnoseInput: React.FC = () => {
    const dispatch = useDispatch(); 

    const textAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(setSymptomText(e.target.value))
        }
    
    return (
        <div className="by-symptoms__question-item">
            <div className="by-symptoms__answer-container">
                <textarea className="by-symptoms__text-area" name="symptom-text" onChange={textAreaHandler}/>
                <div className="by-symptoms__sign-container"></div>
            </div>
        </div>
    );
};

export default DiagnoseInput;