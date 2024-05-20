import React from "react";
import "../app/styles/choose-diagnostic-method.css"; 
import Navbar from "../widgets/Navbar";
import Footer from "../widgets/Footer";
import GoMethodBtn from "../features/GoMethodBtn";

const ChooseDiagnosticMethod: React.FC = () => {
    return (
        <div className="page-container">

            <Navbar></Navbar>

            <main className="main">
                <div className="choose-diagnostic-method">
                    <div className="container">
                        <h1 className="choose-diagnostic-method__h">Choose diagnostic method</h1>
                        <div className="choose-diagnostic-method__method-listing">
                            <div className="choose-diagnostic-method__method-container">
                                <div className="choose-diagnostic-method__method-h-container">
                                    <div className="choose-diagnostic-method__method-h">By symptoms</div>
                                </div>
                                <div className="choose-diagnostic-method__method-img-container">
                                    {/* <img className="choose-diagnostic-method__method-img" src="../app/images/by_symptoms_method.jpg" alt=""/> */}
                                </div>
                                <GoMethodBtn></GoMethodBtn>
                            </div>
                            <div className="choose-diagnostic-method__sign-container">
                                <svg className="choose-diagnostic-method__plus-sign" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 45.402 45.402" xmlSpace="preserve"><g><path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path></g></svg>
                            </div> 
                            <div className="choose-diagnostic-method__method-container">
                                <div className="choose-diagnostic-method__method-h-container">
                                    <div className="choose-diagnostic-method__method-h">By image</div>
                                </div>
                                <div className="choose-diagnostic-method__method-img-container">
                                    {/* <img className="choose-diagnostic-method__method-img" src="../app/images/by_img_method.jpg" alt=""/> */}
                                </div>
                                <GoMethodBtn></GoMethodBtn>
                            </div>
                            <div className="choose-diagnostic-method__sign-container">
                                <svg className="choose-diagnostic-method__equal-sign" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 959.5 959.5" xmlSpace="preserve"><g><path d="M110,795.65h739.5c60.801,0,110-49.201,110-110c0-60.801-49.199-110-110-110H110c-60.8,0-110,49.199-110,110 C0,746.449,49.2,795.65,110,795.65z"></path><path d="M110,383.849h739.5c60.801,0,110-49.2,110-110c0-60.8-49.199-110-110-110H110c-60.8,0-110,49.2-110,110 C0,334.649,49.2,383.849,110,383.849z"></path></g></svg>
                            </div> 
                            <div className="choose-diagnostic-method__combine-method-container">
                                <div className="choose-diagnostic-method__method-h-container">
                                    <div className="choose-diagnostic-method__method-h">Combine methods</div>
                                </div>
                                <div className="choose-diagnostic-method__combine-method-img-container">
                                    {/* <img className="choose-diagnostic-method__combine-method-img" src="../app/images/combine_method.png" alt=""/> */}
                                </div>
                                <GoMethodBtn></GoMethodBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default ChooseDiagnosticMethod;

