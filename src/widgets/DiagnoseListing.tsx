import React from "react";
import "../app/styles/diagnose-listing.css"; 
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IPostDiagnoseState } from "../store/slices/post/diagnose";

const DiagnoseListing: React.FC = () => {
    const result: IPostDiagnoseState = useSelector((state: RootState) => state.diagnose);
    return (
        <div className="result__diagnose-listing">
            {result.diseases.map(function(disease){
                return <div className="result__diagnose-container">
                    <div className="result__disease-name">{disease.disease_name}</div>
                    <div className="result__delimiter"></div>
                    <div className="result__disease-probability-container">
                        <span className="result__disease-probability">
                            {disease.disease_description}
                        </span>
                    </div>
                </div>
            }
            )}
        </div>
    );
};

export default DiagnoseListing;