import React from "react";
import "../app/styles/number-circle.css";
import CSS from 'csstype';

interface INumberCircleProps {
    num: number; 
    backgroundColor: string;
}

function NumberCircle({num, backgroundColor}: INumberCircleProps) {
    const numberCircleStyle: CSS.Properties = {
        background: backgroundColor,
    }

    return (
        <div className="number-circle">
            <div className="number-circle__circle" style={numberCircleStyle}>{num}</div>
        </div>
    );
};

export default NumberCircle;