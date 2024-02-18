import React from "react";
import "../app/styles/go-method-btn.css"; 

const GoMethodBtn: React.FC = () => {
    return (
        <form className="choose-diagnostic-method__form" action="#">
            <button className="choose-diagnostic-method__btn">Go</button>
        </form>
    );
};

export default GoMethodBtn;