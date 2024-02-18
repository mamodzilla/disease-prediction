import React from "react";
import "../app/styles/diagnose-listing.css"; 
import DiseaseMoreArrow from "../shared/DiseaseMoreArrow";

const DiagnoseListing: React.FC = () => {
    return (
        <div className="result__diagnose-listing">
            <div className="result__diagnose-container">
                <div className="result__disease-name">Broken finger</div>
                <div className="result__delimiter"></div>
                <div className="result__disease-probability-container"><span className="result__disease-probability">95%</span></div>
                <div className="result__disease-arrow-container">
                    <DiseaseMoreArrow></DiseaseMoreArrow>
                </div>
            </div>
            <div className="result__diagnose-container">
                <div className="result__disease-name">Finger bruise</div>
                <div className="result__delimiter"></div>
                <div className="result__disease-probability-container"><span className="result__disease-probability">23%</span></div>
                <div className="result__disease-arrow-container">
                    <DiseaseMoreArrow></DiseaseMoreArrow>
                </div>
            </div>
        </div>
    );
};

export default DiagnoseListing;