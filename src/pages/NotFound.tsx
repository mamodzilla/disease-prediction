import React from 'react'; 
import Footer from '../widgets/Footer';
import Navbar from '../widgets/Navbar';
import GoHomeBtn from '../features/GoHomeBtn';

const NotFound: React.FC = () => {
    return (
        <div className="page-container">
            <Navbar></Navbar>
            <main className="main">
                <h2>Resource's not found</h2>
                <GoHomeBtn></GoHomeBtn>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default NotFound; 