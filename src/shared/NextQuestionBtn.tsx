import React from "react";
import "../app/styles/next-question-btn.css";

const NextQuestionBtn: React.FC = () => {
    return (
        <form className="by-symptoms__form" action="">
            <button className="by-symptoms__next-question-btn">Next</button>
        </form>
    );
};

export default NextQuestionBtn;