import React from "react";
import "../app/styles/disease-data.css";

const DiseaseData: React.FC = () => {
    return (
        <div className="disease-history__disease-data">
            <h2 className="disease-history__disease-data-h">Broken finger</h2>
            <div className="disease-history__disease-description-h">Disease description</div>
            <div className="disease-history__disease-description-container">
                <div className="disease-history__disease-description-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. 
                </div>
            </div>
            <div className="disease-history__disease-description-h">Your symptoms</div>
            <div className="disease-history__symptom-listing">
                <div className="disease-history__symptom-item">
                    <div className="disease-history__symptom-text">Pain when moving</div>
                    <div className="disease-history__delimiter"></div>
                    <div className="disease-history__symptom-value">yes</div>
                </div>
                <div className="disease-history__symptom-item">
                    <div className="disease-history__symptom-text">Inability to fully strai ... </div>
                    <div className="disease-history__delimiter"></div>
                    <div className="disease-history__symptom-value">yes</div>
                </div>
            </div>
        </div>
    );
};

export default DiseaseData;