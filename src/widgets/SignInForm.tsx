import React from "react";
import "../app/styles/sign-in-form.css";
import "../app/styles/sign-in-btn.css";
import InputSign from "../shared/InputSign";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IPostLoginState, setUserData, IPostLogin, postLogin, setTokens} from "../store/slices/post/login";
import { Navigate, useNavigate } from "react-router-dom";

const SignInForm: React.FC = () => {   
    const dispatch = useDispatch();   
    const navigate = useNavigate();
    let isOK = false;
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
        dispatch(setUserData(data));
        const getResult = () => {
        const request: IPostLogin = {
            email: data.email,
            password: data.password
        };
        type MyInterfaceType = Awaited<ReturnType<typeof postLogin>>;     
        const extract = (data: MyInterfaceType) => {
                const output: IPostLoginState = {
                    email: data.email,
                    password: data.password,
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    isAuth: false
                }
                dispatch(setTokens(output));
            }
            postLogin(request).then(response => {
                extract(response);
                isOK = true;
                localStorage.setItem('access_token', response.access_token);
                document.cookie = `refresh_token=${response.refresh_token}`;
                if (isOK) {
                    navigate("/personal-info");
                }
            });
        }
        getResult();
    } 
    // const result: IPostLoginState = useSelector((state: RootState) => state.login);
    return (
        <form className="sign-in__form" method="post" onSubmit={handleSubmit(useOnSubmit)}>
            <div className="sign-in__input-listing">
                <div className="sign-in__item">
                    <div className="sign-in__item-text">Email:</div>
                    <div className="sign-in__item-input-container">
                        <input {...register('email', {
                            required: "E-mail is required!",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                                message: "Wrong format of e-mail!"
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