import React from "react";
import "../app/styles/annual-incidence-chart.css"; 

const AnnualIncidenceChart: React.FC = () => {
    return (
        <div className="statistics__annual-incidence-chart">
            <div className="statistics__annual-incidence-chart-head">
                Aug <span className="statistics__date">2023</span> - Jul <span className="statistics__date">2024</span>
            </div>
        </div>
    );
};

export default AnnualIncidenceChart; 