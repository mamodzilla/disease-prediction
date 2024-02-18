import React from "react";
import "../app/styles/question.css";

const Question: React.FC = () => {
    return (
        <div className="by-symptoms__question-item">
            <div className="by-symptoms__question-header">
                <div className="by-symptoms__question-number">Question #1</div>
                <div className="by-symptoms__question-text">Your date of birth</div>
            </div>
            <div className="by-symptoms__answer-container">
                <input className="by-symptoms__input" type="text" name="birth_date"/>
                <div className="by-symptoms__sign-container"></div>
            </div>
        </div>
    );
};

export default Question;