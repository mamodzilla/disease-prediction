import React from "react";
import "../app/styles/diagnose-listing.css"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IPostDiagnoseState, setDescriptionOpeningStatus } from "../store/slices/post/diagnose";
import NumberCircle from "../shared/NumberCircle";

const DiagnoseListing: React.FC = () => {
    const dispatch = useDispatch();
    const result: IPostDiagnoseState = useSelector((state: RootState) => state.diagnose);

    const clickArrowHandler = (index: number, e: React.MouseEvent<HTMLOrSVGElement>) => {
        dispatch(setDescriptionOpeningStatus(index));
    }

    return (
        <div className="result__diagnose-listing">
                {result.diseases.map(function(disease){
                    const diseaseIndex: number = result.diseases.indexOf(disease);
                    let backgroundColor: string;
                    switch (diseaseIndex) {
                        case 0: {
                            backgroundColor = "red";
                            break; 
                        }
                        case 1: {
                            backgroundColor = "orange";
                            break;
                        }
                        case 2: {
                            backgroundColor = "yellow";
                            break;
                        }
                        default: {
                            backgroundColor = "white";
                            break;
                        }
                    };
                    
                    let arrowClassName: string = "result__btn-arrow";
                    if (disease.descriptionIsOpen) arrowClassName = "result__btn-arrow result__btn-arrow--open";

                    return <div className="result__diagnose-container-wrapper">
                            <div className="result__diagnose-container">
                                <div className="result__number-circle-container"><NumberCircle num={diseaseIndex+1} backgroundColor={backgroundColor}></NumberCircle></div>
                                <div className="result__disease-name">{disease.disease_name}</div>

                                <div className="result__disease-description-container">
                                    <span className="result__disease-description">
                                        {!disease.descriptionIsOpen && disease.disease_description.slice(0, 40) + "..."}
                                    </span>
                                </div>

                                <div className="result__disease-arrow-container">
                                    <svg className={arrowClassName} onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => clickArrowHandler(diseaseIndex, e)} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m70.143 97.5-44.71-44.711a3.943 3.943 0 0 1 0-5.578l44.71-44.711 5.579 5.579-41.922 41.921 41.922 41.922z"></path></svg>
                                </div>

                            </div>
                            {disease.descriptionIsOpen &&
                                <div className="result__open-disease-description-container">
                                    <span className="result__disease-description">
                                        {disease.disease_description}
                                    </span>
                                </div>
                            }   
                        </div>
                
                }
                )}
        </div>
    );
};

export default DiagnoseListing;