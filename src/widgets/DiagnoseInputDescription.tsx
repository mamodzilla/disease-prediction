import React from "react";
import "../app/styles/progress.css"; 

const DiagnoseInputDescription: React.FC = () => {
    return (
        <div className="by-symptoms__progress-container">
            <div className="by-symptoms__progress-header">
                Enter symptomps in text field.<br/><b>Note:</b> The more symptoms you write, the more accurately the diagnosis will be determined.
            </div>
        </div>
    ); 
};

export default DiagnoseInputDescription;