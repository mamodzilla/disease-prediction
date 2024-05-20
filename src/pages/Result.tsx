import React from "react";
import "../app/styles/result.css";
import Navbar from "../widgets/Navbar";
import Footer from "../widgets/Footer";
import GoHomeBtn from "../features/GoHomeBtn";
import DiagnoseListing from "../widgets/DiagnoseListing";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IPostDiagnoseState } from "../store/slices/post/diagnose";

const Result: React.FC = () => {
    const result: IPostDiagnoseState = useSelector((state: RootState) => state.diagnose);
    return (
        <div className="by-symptoms__progress-container">
            <div className="by-symptoms__progress-header result__disease">
                <h4>Diagnose</h4>
                <div className="result__disease">
                    {result.disease_name}
                </div>
                <h4>Description</h4>
                <div className="result__disease">
                    {result.disease_description}
                </div>
            </div>
        </div>
    );
};

export default Result;