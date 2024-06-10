import React from "react";
import "../app/styles/next-question-btn.css";
import { usePostDiagnoseGetResult} from "../store/slices/post/diagnose";
import { Link } from "react-router-dom";

const GetResultBtn: React.FC = () => {
    return (
            <Link to="/result" className="result__form">
                <button className="by-symptoms__next-question-btn" onClick={usePostDiagnoseGetResult}>
                    Get result
                </button>
            </Link>
    );
};

export default GetResultBtn;