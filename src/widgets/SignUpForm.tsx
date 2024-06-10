import React from "react";
import "../app/styles/sign-up-form.css"; 
import "../app/styles/sign-up-btn.css";
import InputSign from "../shared/InputSign";
//import SignUpBtn from "../features/SignUpBtn";
import { useForm } from "react-hook-form";
import { IPostRegister, postRegister, setRegisterData} from "../store/slices/post/register";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

const SignUpForm: React.FC = () => {
    const dispatch = useDispatch();
    const {
        register,
        formState: {
            errors, isValid
        },
        handleSubmit,
    } = useForm(
        {
            mode: "onSubmit"
        }
    );
    const useOnSubmit = (data: any) => {
        dispatch(setRegisterData(data));
        const nickname = useSelector((state:RootState)=>state.register.nickname)
        const email = useSelector((state: RootState)=>state.register.email);
        const password = useSelector((state: RootState)=>state.register.password);
        let isOK = false;
        const getResult = () => {      
            const request: IPostRegister = {
                nickname: nickname,
                email: email,
                password: password
            };
            postRegister(request).then((response) => {if (response.ok) {isOK = true}});
        }
        getResult();
        if (!isOK) {
            <Navigate to="/login"></Navigate>
        };
    } 
    return (
        <form className="sign-up__form" method="post" onSubmit={handleSubmit(useOnSubmit)}>
            <div className="sign-up__input-listing">
                <div className="sign-up__item">
                    <div className="sign-up__item-text">Nickname:</div>
                    <div className="sign-up__item-input-container">
                        <input className="sign-up__item-input" name="nickname" type="text" 
                        required/>
                        <div className="sign-up__item-input-sign-container"></div>
                    </div>
                </div>
                <div className="sign-up__item">
                    <div className="sign-up__item-text">Email:</div>
                    <div className="sign-up__item-input-container">
                        <input {...register('email', {
                            required: "E-mail is required!",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                                message: "Wrong format of e-mail!"
                            }
                        })}                        
                        className="sign-up__item-input" name="email" type="email" required/>
                        <div className="sign-up__item-input-sign-container"></div>
                    </div>
                    <div className="sign-in__item">
                            {errors?.email && <p>{errors?.email?.message?.toString() || "Error!"}</p>}
                        </div>
                </div>
                <div className="sign-up__item">
                    <div className="sign-up__item-text">Password:</div>
                    <div className="sign-up__item-input-container">
                        <input {...register('password', {
                            required: "Password is required!",
                            minLength: {
                                value: 5,
                                message: "Password require more than 5 symbols."
                            }
                        })} 
                        className="sign-up__item-input" name="password" type="password" required/>
                        <div className="sign-up__item-input-sign-container"><InputSign></InputSign></div>
                    </div>
                    <div className="sign-in__item">
                            {errors?.password && <p>{errors?.password?.message?.toString() || "Error!"}</p>}
                        </div>
                </div>
                <div className="sign-up__item">
                    <div className="sign-up__item-text">Password again:</div>
                    <div className="sign-up__item-input-container">
                        <input className="sign-up__item-input" name="password_again" type="password" required/>
                        <div className="sign-up__item-input-sign-container"><InputSign></InputSign></div>
                    </div>
                </div>
            </div>
            <div className="sign-up__btn-container">
                <button className="sign-up__btn" type="submit" disabled={!isValid}>Create account</button>
            </div>
        </form>
    ); 
};

export default SignUpForm;