import React from 'react'; 
import Header from '../widgets/Header';
import HowToUse from '../widgets/HowToUse';
import About from '../widgets/About';
import Footer from '../widgets/Footer';

const Home: React.FC = () => {
    return (
        <div className="page-container">
            <Header></Header>
            <main className="main">
                <About></About>
                <HowToUse></HowToUse>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Home; 