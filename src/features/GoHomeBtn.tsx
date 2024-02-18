import React from "react";
import "../app/styles/go-home-btn.css";

const GoHomeBtn: React.FC = () => {
    return (
        <form className="result__form" action="#">
            <button className="result__btn">Go home page</button>
        </form>
    );
};

export default GoHomeBtn;