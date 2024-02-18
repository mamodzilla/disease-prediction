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
                            <div className="how-to-use__number-circle">1</div>
                            <h2 className="how-to-use__item-h">Choose a  method</h2>
                        </div>
                        <div className="how-to-use__item-listing">
                            <div className="how-to-use__listing-variant">
                                <div className="how-to-use__listing-marker"></div>
                                <div className="how-to-use__listing-variant-text">By symptoms</div>
                            </div>
                            <div className="how-to-use__listing-variant">
                                <div className="how-to-use__listing-marker"></div>
                                <div className="how-to-use__listing-variant-text">By image</div>
                            </div>
                            <div className="how-to-use__listing-variant">
                                <div className="how-to-use__listing-marker"></div>
                                <div className="how-to-use__listing-variant-text">Combine methods</div>
                            </div>
                        </div>
                    </div>
                    <div className="how-to-use__item">
                        <div className="how-to-use__item-header">
                            <div className="how-to-use__number-circle">2</div>
                            <h2 className="how-to-use__item-h">Provide the data</h2>
                        </div>
                        <div className="how-to-use__item-listing">
                            <div className="how-to-use__listing-variant">
                                <div className="how-to-use__listing-marker"></div>
                                <div className="how-to-use__listing-variant-text">Indicate symptoms</div>
                            </div>
                            <div className="how-to-use__listing-variant">
                                <div className="how-to-use__listing-marker"></div>
                                <div className="how-to-use__listing-variant-text">Give laboratory data</div>
                            </div>
                            <div className="how-to-use__listing-variant">
                                <div className="how-to-use__listing-marker"></div>
                                <div className="how-to-use__listing-variant-text">Insert image</div>
                            </div>
                        </div>
                    </div>
                    <div className="how-to-use__item">
                        <div className="how-to-use__item-header">
                            <div className="how-to-use__number-circle">3</div>
                            <h2 className="how-to-use__item-h">Get the result</h2>
                        </div>
                        <div className="how-to-use__item-listing">
                            <div className="how-to-use__listing-variant">
                                <div className="how-to-use__listing-marker"></div>
                                <div className="how-to-use__listing-variant-text">Disease name</div>
                            </div>
                            <div className="how-to-use__listing-variant">
                                <div className="how-to-use__listing-marker"></div>
                                <div className="how-to-use__listing-variant-text">Probability of diseases</div>
                            </div>
                            <div className="how-to-use__listing-variant">
                                <div className="how-to-use__listing-marker"></div>
                                <div className="how-to-use__listing-variant-text">Add result to your medical history</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowToUse; 