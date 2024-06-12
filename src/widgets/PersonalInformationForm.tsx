import React from "react";
import "../app/styles/personal-information-form.css"; 
import InputSign from "../shared/InputSign";
import SavePersonalInformationBtn from "../features/SavePersonalInformationBtn";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { IGetUserProfileState, getUserProfile, setUserInfo, useGetUserProfileGetResult } from "../store/slices/get/user/profile";

const PersonalInformationForm: React.FC = () => {
    const accessToken = localStorage.getItem('access_token');
    const dispatch = useDispatch(); 
    const getResult = () => {
        type MyInterfaceType = Awaited<ReturnType<typeof getUserProfile>>;     
        const extract = (data: MyInterfaceType) => {
            const output: IGetUserProfileState = {
                nickname : data.nickname,
                email : data.email,
                password : data.password,
                birth_date : data.birth_date,
                gender : data.gender,
                marital_status : data.marital_status,
                having_children : data.having_children,
                job : data.job,
                location : data.location,
            }
            dispatch(setUserInfo(output));
        }
        getUserProfile(accessToken?.toString()).then(data => extract(data));
    }
    getResult();
    const result: IGetUserProfileState = useSelector((state: RootState) => state.user_profile);
    return (
        <form className="personal-info__form" method="post">
            <div className="personal-info__item-listing">
                <div className="personal-info__item-string">
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">EMAIL</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="email" type="email" placeholder={result.email}/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">PASSWORD</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="password" type="password" placeholder={result.password}/>
                            <div className="personal-info__item-input-sign-container"><InputSign></InputSign></div>
                        </div>
                    </div>
                </div>
                <div className="personal-info__item-string">
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">BIRTH DATE</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="birth_date" type="text" placeholder={result.birth_date}/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">GENDER</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="gender" type="text" placeholder={result.gender}/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">MARITAL STATUS</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="marital_status" type="text" placeholder={result.marital_status}/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                </div>
                <div className="personal-info__item-string">
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">HAVING CHILDREN</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="having_children" type="text" placeholder={result.having_children.toString()}/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">JOB</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="job" type="text" placeholder={result.job}/>
                            <div className="personal-info__item-input-sign-container"></div>
                        </div>
                    </div>
                    <div className="personal-info__item">
                        <div className="personal-info__item-text">LOCATION</div>
                        <div className="personal-info__item-input-container">
                            <input className="personal-info__item-input" name="location" type="text" placeholder={result.location}/>
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