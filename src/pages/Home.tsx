import React from 'react'; 
import Header from '../widgets/Header';
import HowToUse from '../widgets/HowToUse';
import About from '../widgets/About';
//import UserStatistics from '../widgets/UserStatistics';
import Footer from '../widgets/Footer';

const Home: React.FC = () => {
    return (
        <div className="page-container">
            <Header></Header>
            <main className="main">
                <About></About>
                <HowToUse></HowToUse>
                {/*<UserStatistics></UserStatistics>*/}
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Home; 