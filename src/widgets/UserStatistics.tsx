import React from 'react'; 
import '../app/styles/user-statistics.css';
import SliderPrevBtn from '../shared/SliderPrevBtn';
import SliderNextBtn from '../shared/SliderNextBtn';
import UserStatisticsSlider from './UserStatisticsSlider';

const UserStatistics: React.FC = () => {
    return (
        <section className="user-statistics">
            <div className="container">
                <div className="h-container">
                    <h1 className="user-statistics-h">User statistics</h1>
                </div>
                <div className="user-statistics__slider-container">
                    <SliderPrevBtn></SliderPrevBtn>
                    <UserStatisticsSlider></UserStatisticsSlider>
                    <SliderNextBtn></SliderNextBtn>
                </div>
            </div>
        </section>
    );
};

export default UserStatistics; 