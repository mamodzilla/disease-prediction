import React from "react";
import "../app/styles/next-question-btn.css";
import { useDispatch, useSelector } from "react-redux";
import { IPostDiagnose, IPostDiagnoseState, postDiagnose, postDiagnoseGetResult, setDiagnoseResponse } from "../store/slices/post/diagnose";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";

const GetResultBtn: React.FC = () => {
    return (
            <Link to="/result" className="result__form">
                <button className="by-symptoms__next-question-btn" onClick={postDiagnoseGetResult}>
                    Get result
                </button>
            </Link>
    );
};

export default GetResultBtn;