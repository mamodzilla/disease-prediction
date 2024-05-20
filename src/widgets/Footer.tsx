import React from "react";
import "../app/styles/footer.css";
import Contacts from "../shared/Contacts";
import Logo from "../shared/Logo";
import { IPostDiagnose, IPostDiagnoseState, postDiagnose, setDiagnoseResponse } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

const Footer: React.FC = () => {
    const dispatch = useDispatch(); 
    const WelcomeBtnHandler = (e:React.MouseEvent<HTMLDivElement>) => {
        const vagina_cancer: IPostDiagnose = {
            symptom_text: "necrosis of big vagina lips, necrosis of clitorus"
        };
        const pd = postDiagnose(vagina_cancer);
        console.log(pd);    
        type MyInterfaceType = Awaited<ReturnType<typeof postDiagnose>>      
        const exampleFunction = (data: MyInterfaceType) => {
            const output: IPostDiagnoseState = {
                disease_name: data.disease_name,
                disease_description: data.disease_description
            }
            dispatch(setDiagnoseResponse(output))
        };       
        postDiagnose(vagina_cancer).then(data => exampleFunction(data));
    }
    const result: IPostDiagnoseState = useSelector((state: RootState) => state.diagnose);
    console.log(result);
    return (
        <footer className="footer">
            <div className="footer__top-container">
                <div className="container">
                    <div className="footer__logo-container">
                        <Logo></Logo>
                        {result.disease_name}
                                {result.disease_description}
                    </div>
                    <div className="footer__links">
                        <ul className="footer__link-list">
                            <li className="footer__list-item">
                                <a className="footer__list-link" href="home">Home</a>
                            </li>
                            <li className="footer__list-item">
                                <a className="footer__list-link" href="personal-info">Personal account</a>
                            </li>
                            <li className="footer__list-item">
                                <a className="footer__list-link" href="choose">Start diagnosing</a>
                            </li>
                        </ul>
                        <ul className="footer__link-list">
                            <li className="footer__list-item">
                                <a className="footer__list-link" href="history">Disease history</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer__contacts-container" onClick={WelcomeBtnHandler}>
                Тестируем ебать
            </div>
            <div className="footer__contacts-container">
                <Contacts></Contacts>
            </div>
        </footer>
    );
};

export default Footer;