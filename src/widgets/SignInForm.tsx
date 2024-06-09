import React from "react";
import "../app/styles/sign-in-form.css";
import "../app/styles/sign-in-btn.css";
import InputSign from "../shared/InputSign";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IPostLogin, IPostLoginState, postLogin, setTokens, setUserData } from "../store/slices/post/login";
import { access } from "fs";

const SignInForm: React.FC = () => {
    const dispatch = useDispatch(); 
    const email = useSelector((state: RootState)=>state.login.email);
    const password = useSelector((state: RootState)=>state.login.password);
    const {
        register,
        formState: {
            errors, isValid
        },
        reset,
        handleSubmit,
    } = useForm(
        {
            mode: "onBlur"
        }
    );
    const onSubmit = (data: any) => {
        dispatch(setUserData(data));
        const getResultBtnHandler = () => {
            const request: IPostLogin = {
                email: email,
                password: password
            };
            type MyInterfaceType = Awaited<ReturnType<typeof postLogin>>;     
            const exampleFunction = (data: MyInterfaceType) => {
                const output: IPostLoginState = {
                    email: email,
                    password: password,
                    access_token: data.access_token,
                    refresh_token: data.refresh_token
                }
                dispatch(setTokens(output));
                postLogin(data).then(data => exampleFunction(data));
        }};
        getResultBtnHandler();
        const result: IPostLoginState = useSelector((state: RootState) => state.login);
        localStorage.setItem('access_token', result.access_token);
        document.cookie = `refresh_token=${result.refresh_token}`;
        reset();  
    } 
    return (
        <form className="sign-in__form" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="sign-in__input-listing">
                <div className="sign-in__item">
                    <div className="sign-in__item-text">Email:</div>
                    <div className="sign-in__item-input-container">
                        <input {...register('email', {
                            required: "E-mail is required!",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                                message: "Wrong format for e-mail!"
                            }
                        })} className="sign-in__item-input" name="email" type="email"/>                        
                    </div>
                    <div className="sign-in__item">
                            {errors?.email && <p>{errors?.email?.message?.toString() || "Error!"}</p>}
                        </div>
                </div>
                <div className="sign-in__item">
                    <div className="sign-in__item-text">Password:</div>
                    <div className="sign-in__item-input-container">
                        <input {...register('password', {
                            required: "Password is required!",
                            minLength: {
                                value: 5,
                                message: "Password require more than 5 symbols."
                            }
                        })} className="sign-in__item-input" name="password" type="password"/>
                        <div className="sign-in__item-input-sign-container"><InputSign></InputSign></div>
                    </div>
                    <div className="sign-in__item">
                            {errors?.password && <p>{errors?.password?.message?.toString() || "Error!"}</p>}
                        </div>
                </div>
            </div>
            <div className="sign-in__btn-container">
            <button className="sign-in__btn" type="submit" disabled={!isValid}>Login</button>
            </div>
        </form>
    );
};

export default SignInForm;