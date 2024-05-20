import React from 'react';
import '../app/styles/welcome-btn.css';
import { useDispatch } from 'react-redux';
import { IPostDiagnose, IPostDiagnoseState, postDiagnose, setDiagnoseResponse } from '../store/slices/post/diagnose';
import { error } from 'console';

const WelcomeBtn: React.FC = () => {
    const dispatch = useDispatch();
    const WelcomeBtnHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
        const vagina_cancer: IPostDiagnose = {
            symptom_text: "necrosis of big vagina lips, necrosis of clitorus"
        };
        const pd = postDiagnose(vagina_cancer);
        console.log(pd);
    }
    return (
        <form className="header__start-diagnosing-form" action="method">
            <button className="header__start-diagnosing-btn" onClick={WelcomeBtnHandler}>Start diagnosing</button>
        </form>
    );
};

export default WelcomeBtn;