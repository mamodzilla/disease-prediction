import React from "react";
import "../app/styles/personal-account-menu.css";

const PersonalAccountMenu: React.FC = () => {
    return (
        <div className="personal-account-menu">
            <form className="personal-account-menu__form" action="#">
                <button className="personal-account-menu__tab-btn personal-account-menu__first-tab-btn personal-account-menu__tab-btn--active">
                    Personal information
                </button>
            </form>
            <form className="personal-account-menu__form" action="#">
                <button className="personal-account-menu__tab-btn">
                    Disease history
                </button>
            </form>
            <form className="personal-account-menu__form" action="#">
                <button className="personal-account-menu__tab-btn personal-account-menu__last-tab-btn">
                    Statistics
                </button>
            </form>
        </div>
    );
}; 

export default PersonalAccountMenu;