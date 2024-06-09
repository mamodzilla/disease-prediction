import React from "react";
import "../app/styles/go-home-btn.css";
import { Link } from "react-router-dom";

const GoHomeBtn: React.FC = () => {
    return (
        <Link to="/home" className="result__form" >
            <button className="result__btn">Go home page</button>
        </Link>
    );
};

export default GoHomeBtn;