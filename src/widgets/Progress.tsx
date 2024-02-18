import React from "react";
import "../app/styles/progress.css"; 
import ProgressBar from "./ProgressBar";

const Progress: React.FC = () => {
    return (
        <div className="by-symptoms__progress-container">
            <div className="by-symptoms__progress-header">
                <div className="by-symptoms__progress-h">Progress</div>
                <div className="by-symptoms__stage-number">stage #1</div>
                <div className="by-symptoms__stage-name">Problem definition</div>
            </div>
            <ProgressBar></ProgressBar>
        </div>
    ); 
};

export default Progress;