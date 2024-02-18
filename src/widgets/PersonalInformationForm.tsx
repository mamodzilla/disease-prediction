import React from "react";
import "../app/styles/personal-information-form.css"; 
import InputSign from "../shared/InputSign";
import SavePersonalInformationBtn from "../features/SavePersonalInformationBtn";

const PersonalInformationForm: React.FC = () => {
    return (
        <form className="personal-info__form" method="post">
            <div className="personal-info__item-listing">
                <div className="personal-info__item-string">
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">EMAIL</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="email" type="email"/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">PASSWORD</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="password" type="password"/>
                            <div className="personal-info__item-input-sign-container"><InputSign></InputSign></div>
                        </div>
                    </div>
                </div>
                <div className="personal-info__item-string">
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">BIRTH DATE</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="birth_date" type="text"/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">GENDER</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="gender" type="text"/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">MARITAL STATUS</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="marital_status" type="text"/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                </div>
                <div className="personal-info__item-string">
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">HAVING CHILDREN</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="having_children" type="text"/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">JOB</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="job" type="text"/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">LOCATION</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="location" type="text"/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="personal-info__save-btn-container">
                <SavePersonalInformationBtn></SavePersonalInformationBtn>
            </div>
        </form>
    );
};

export default PersonalInformationForm; 