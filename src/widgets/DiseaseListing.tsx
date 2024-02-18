import React from "react";
import "../app/styles/disease-listing.css";

const DiseaseListing: React.FC = () => {
    return (
        <div className="disease-history__disease-listing">
            <div className="disease-history__disease-container">
                <div className="disease-history__disease-item disease-history__disease-item--active">
                    <div className="disease-history__disease-content">
                        <div className="disease-history__disease-name">Broken finger</div>
                        <div className="disease-history__disease-duration">23.10.2023 - 20.11.2023</div>
                    </div>
                    <div className="disease-history__disease-status-container">
                        <div className="disease-history__disease-status disease-is-over"></div>
                        <div className="disease-history__disease-status-short-line disease-is-over disease-history__disease-status-short-line--active"></div>
                    </div>
                </div>
                <div className="disease-history__disease-status-container">
                    <div className="disease-history__disease-status-long-line disease-is-over disease-history__disease-status-long-line--active"></div>
                </div>
            </div>
            <div className="disease-history__disease-container">
                <div className="disease-history__disease-item">
                    <div className="disease-history__disease-content">
                        <div className="disease-history__disease-name">Bronchitis</div>
                        <div className="disease-history__disease-duration">29.10.2023 - 08.11.2023</div>
                    </div>
                    <div className="disease-history__disease-status-container">
                        <div className="disease-history__disease-status disease-is-over"></div>
                        <div className="disease-history__disease-status-short-line disease-is-over"></div>
                    </div>
                </div>
                <div className="disease-history__disease-status-container">
                    <div className="disease-history__disease-status-long-line disease-is-over"></div>
                </div>
            </div>
            <div className="disease-history__disease-container">
                <div className="disease-history__disease-item">
                    <div className="disease-history__disease-content">
                        <div className="disease-history__disease-name">Сhronic gastritis</div>
                        <div className="disease-history__disease-duration">21.11.2023 - to present</div>
                    </div>
                    <div className="disease-history__disease-status-container">
                        <div className="disease-history__disease-status disease-is-chronic"></div>
                        <div className="disease-history__disease-status-short-line disease-is-chronic"></div>
                    </div>
                </div>
                <div className="disease-history__disease-status-container">
                    <div className="disease-history__disease-status-long-line disease-is-chronic"></div>
                </div>
            </div>
            <div className="disease-history__disease-container">
                <div className="disease-history__disease-item">
                    <div className="disease-history__disease-content">
                        <div className="disease-history__disease-name">Sinusitis</div>
                        <div className="disease-history__disease-duration">25.02.2024 - to present</div>
                    </div>
                    <div className="disease-history__disease-status-container">
                        <div className="disease-history__disease-status disease-is-continuing"></div>
                        <div className="disease-history__disease-status-short-line disease-is-continuing"></div>
                    </div>
                </div>
                <div className="disease-history__disease-status-container">
                    <div className="disease-history__disease-status-long-line disease-is-continuing"></div>
                </div>
            </div>
        </div>
    );
};

export default DiseaseListing;