import React from "react";
import "../app/styles/footer.css";
import Contacts from "../shared/Contacts";
import Logo from "../shared/Logo";
import { Link } from "react-router-dom";

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
                                <Link to="/home" className="footer__list-link">Home</Link>
                            </li>
                            <li className="footer__list-item">
                                <Link to="/personal-info" className="footer__list-link">Personal account</Link>
                            </li>
                            <li className="footer__list-item">
                                <Link to="/method" className="footer__list-link">Start diagnosing</Link>
                            </li>
                        </ul>
                        <ul className="footer__link-list">
                            <li className="footer__list-item">
                                <Link to="/history" className="footer__list-link">Disease history</Link>
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