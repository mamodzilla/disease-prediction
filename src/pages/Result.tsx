import React from "react";
import "../app/styles/result.css";
import Navbar from "../widgets/Navbar";
import Footer from "../widgets/Footer";
import GoHomeBtn from "../features/GoHomeBtn";
import DiagnoseListing from "../widgets/DiagnoseListing";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IPostDiagnoseState } from "../store/slice";

const Result: React.FC = () => {
    
    return (
        <div className="page-container">
            <div className="container">
                <Navbar></Navbar>
            </div>
            <main className="main">
                
                <div className="result">
                    <div className="container">
                        <div className="result__h-container">
                            <h1 className="result__h">Result</h1>
                        </div>
                        <div className="result__container">
                            <div>
                            </div>
                            <div className="result__header">
                                <div className="result__header-diagnoses">Diagnoses</div>
                                <div className="result__header-probability">Probability</div>
                            </div>
                            <DiagnoseListing></DiagnoseListing>
                            <GoHomeBtn></GoHomeBtn>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Result;