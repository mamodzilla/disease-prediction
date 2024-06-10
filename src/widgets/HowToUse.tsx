import React from 'react';
import '../app/styles/how-to-use.css';
import NumberCircle from '../shared/NumberCircle';

const HowToUse: React.FC = () => {
    return (
        <section className="how-to-use">
            <div className="container">
                <div className="h-container">
                    <h1 className="how-to-use__h">How to use?</h1>
                </div>
                <div className="how-to-use__items">
                    <div className="how-to-use__item">
                        <NumberCircle num={1} backgroundColor='linear-gradient(90deg, #57C964 30.19%, #577CEF 100%)'></NumberCircle>
                        <div className="how-to-use__item-text">Click the button "Start diagnosing"</div>
                    </div>
                    <div className="how-to-use__item">
                        <NumberCircle num={2} backgroundColor='linear-gradient(90deg, #57C964 30.19%, #577CEF 100%)'></NumberCircle>
                        <div className="how-to-use__item-text">Enter your symptoms in text field</div>
                    </div>
                    <div className="how-to-use__item">
                        <NumberCircle num={3} backgroundColor='linear-gradient(90deg, #57C964 30.19%, #577CEF 100%)'></NumberCircle>
                        <div className="how-to-use__item-text">Get the result</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowToUse; 