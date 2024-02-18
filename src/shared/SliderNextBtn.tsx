import React from "react";
import "../app/styles/slider-next-btn.css"; 

const SliderNextBtn: React.FC = () => {
    return (
        <button className="slider-next-btn">
            <svg className="slider-next-btn__arrow" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m70.143 97.5-44.71-44.711a3.943 3.943 0 0 1 0-5.578l44.71-44.711 5.579 5.579-41.922 41.921 41.922 41.922z"></path></svg>
        </button>
    );
};

export default SliderNextBtn;