import React from "react";
import "../app/styles/statistics.css"; 
import PersonalAccountMenu from "../widgets/PersonalAccountMenu";
import Navbar from "../widgets/Navbar";
import Footer from "../widgets/Footer";
import SliderPrevBtn from "../shared/SliderPrevBtn";
import SliderNextBtn from "../shared/SliderNextBtn";
import AnnualIncidenceChart from "../widgets/AnnualIncidenceChart";

const Statistics: React.FC = () => {
    return (
        <div className="page-container">
            <div className="container">
                <Navbar></Navbar>
            </div>
            <main className="main">
                <div className="statistics">
                    <div className="container">
                        <PersonalAccountMenu></PersonalAccountMenu>
                        <div className="statistics__container">
                            <div className="statistics__item-string">
                                <div className="statistics__item">
                                    <div className="statistics__item-name">Registration date</div>
                                    <div className="statistics__item-value">23.10.2023</div>
                                </div>
                                <div className="statistics__item">
                                    <div className="statistics__item-name">Number of recorded diseases</div>
                                    <div className="statistics__item-value">4</div>
                                </div>
                            </div>
                            <div className="statistics__item-string">
                                <div className="statistics__item">
                                    <div className="statistics__item-name">Number of recorded diseases for <span className="statistics__date">2024</span></div>
                                    <div className="statistics__item-value">1</div>
                                </div>
                            </div>
                            <div className="statistics__item-name">Annual incidence chart</div>
                            <div className="statistics__annual-incidence-chart-container">
                                <SliderPrevBtn></SliderPrevBtn>
                                <AnnualIncidenceChart></AnnualIncidenceChart>
                                <SliderNextBtn></SliderNextBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Statistics; 