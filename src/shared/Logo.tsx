import React from "react";
import "../app/styles/logo.css";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
    return (
        <Link to="/home" className="logo">Logotype</Link>
    );
};

export default Logo;