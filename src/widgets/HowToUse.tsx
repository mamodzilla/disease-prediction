import React from 'react';
import '../app/styles/how-to-use.css';

const HowToUse: React.FC = () => {
    return (
        <section className="how-to-use">
            <div className="container">
                <div className="h-container">
                    <h1 className="how-to-use__h">How to use?</h1>
                </div>
                <div className="how-to-use__items">
                    <div className="how-to-use__item">
                        <div className="how-to-use__item-header">
                            <div className="how-to-use__number-circle-container">
                                <div className="how-to-use__number-circle">1</div>
                            </div>
                            <h2 className="how-to-use__item-h">Click the button "Start diagnosing"</h2>
                        </div>
                    </div>
                    <div className="how-to-use__item">
                        <div className="how-to-use__item-header">
                            <div className="how-to-use__number-circle-container">
                                <div className="how-to-use__number-circle">2</div>
                            </div>
                            <h2 className="how-to-use__item-h">Enter your symptoms in text field</h2>
                        </div>
                    </div>
                    <div className="how-to-use__item">
                        <div className="how-to-use__item-header">
                            <div className="how-to-use__number-circle-container">
                                <div className="how-to-use__number-circle">3</div>
                            </div>
                            <h2 className="how-to-use__item-h">Get the result</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowToUse; 