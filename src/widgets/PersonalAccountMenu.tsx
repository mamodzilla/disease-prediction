import React from "react";
import "../app/styles/personal-account-menu.css";
import { Link } from "react-router-dom";

const PersonalAccountMenu: React.FC = () => {
    const routes = [
        {id: "/personal-info", name: "Personal information", css: "personal-account-menu__first-tab-btn"},
        {id: "/history", name: "Disease history", css: ""},
        {id: "/stats", name: "Statistics",css: "personal-account-menu__last-tab-btn"}]; 
    for (const route of routes) {
        if (route.id === window.location.pathname) {
            route.css += " personal-account-menu__tab-btn--active";
        }
    }
    return (
        <div className="personal-account-menu">
            {routes.map(function(route){
                return <Link to={route.id} key={route.id}>
                    <button className={`personal-account-menu__tab-btn ${route.css}`}>
                        {route.name}
                    </button>
                </Link>
            })}
        </div>
    );
}; 

export default PersonalAccountMenu;