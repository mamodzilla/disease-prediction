import React from "react";
import "../app/styles/save-personal-information-btn.css";

const SavePersonalInformationBtn: React.FC = () => {
    return (
        <button className="personal-info__save-btn" type="submit">Save changes</button>
    );
};

export default SavePersonalInformationBtn;