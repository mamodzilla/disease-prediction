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

        </div>
    );
};

export default DiseaseData;