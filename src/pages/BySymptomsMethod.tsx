import React from "react";
import "../app/styles/by-symptoms-method.css"; 
import Navbar from "../widgets/Navbar";
import Footer from "../widgets/Footer";
import DiagnoseInputDescription from "../widgets/DiagnoseInputDescription";
import GetResultBtn from "../shared/GetResultBtn";
import DiagnoseInput from "../widgets/DiagnoseInput"

const BySymptomsMethod: React.FC = () => { 
    return (
        <div className="page-container">
            <Navbar></Navbar>
            <main className="main"> 
                <div className="by-symptoms">
                    <div className="container">
                        <div className="h-container">
                            <h1 className="by-symptoms__h">By symptoms</h1>
                        </div>
                        <div className="by-symptoms__container">
                            <DiagnoseInputDescription></DiagnoseInputDescription>
                            <div className="by-symptoms__question-container">
                                <DiagnoseInput></DiagnoseInput>
                                <GetResultBtn></GetResultBtn>                              
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