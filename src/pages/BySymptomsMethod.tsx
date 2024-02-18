import React from "react";
import "../app/styles/by-symptoms-method.css"; 
import Navbar from "../widgets/Navbar";
import Footer from "../widgets/Footer";
import Progress from "../widgets/Progress";
import Question from "../widgets/Question";
import NextQuestionBtn from "../shared/NextQuestionBtn";

const BySymptomsMethod: React.FC = () => {
    return (
        <div className="page-container">
            <div className="container">
                <Navbar></Navbar>
            </div>
            <main className="main"> 
                <div className="by-symptoms">
                    <div className="container">
                        <div className="h-container">
                            <h1 className="by-symptoms__h">By symptoms</h1>
                        </div>
                        <div className="by-symptoms__container">
                            <Progress></Progress>
                            <div className="by-symptoms__question-container">
                                <Question></Question>
                                <NextQuestionBtn></NextQuestionBtn>
                            </div>
                        </div> 
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default BySymptomsMethod;