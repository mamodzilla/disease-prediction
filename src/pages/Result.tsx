import React from "react";
import "../app/styles/result.css";
import Navbar from "../widgets/Navbar";
import GoHomeBtn from "../features/GoHomeBtn";
import Footer from "../widgets/Footer";
import DiagnoseListing from "../widgets/DiagnoseListing";

const Result: React.FC = () => {
    
    return (
        <div className="page-container">
            <Navbar></Navbar>
            <main className="main">
                <div className="result">
                    <div className="container">
                        <div className="result__h-container">
                            <h1 className="result__h">Result</h1>
                        </div>
                        <div className="result__container">
                            <div className="result__header">
                                <div className="result__header-diagnoses">Diagnoses</div>
                                <div className="result__header-probability">Description</div>
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