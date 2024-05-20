import React from "react";
import "../app/styles/footer.css";
import Contacts from "../shared/Contacts";
import Logo from "../shared/Logo";

const Footer: React.FC = () => {
    
    return (
        <footer className="footer">
            <div className="footer__top-container">
                <div className="container">
                    <div className="footer__logo-container">
                        <Logo></Logo>                        
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
                                <a className="footer__list-link" href="method">Start diagnosing</a>
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
            <div className="footer__contacts-container">
                <Contacts></Contacts>
            </div>
        </footer>
    );
};

export default Footer;