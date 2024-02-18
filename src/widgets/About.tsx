import React from 'react';
import '../app/styles/about.css';
import Contacts from '../shared/Contacts';

const About: React.FC = () => {
    return (
        <section className="about">
            <div className="container">
                <div className="h-container">
                    <h1 className="about__h">About project</h1>
                </div>
                <div className="about__text-container">
                    <p className="about__text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Vestibulum rhoncus est 
                        pellentesque elit ullamcorper dignissim cras. Eget nullam non nisi est sit 
                        amet facilisis magna etiam. Est velit egestas dui id ornare arcu odio. 
                        Nulla facilisi morbi tempus iaculis. Ut consequat semper viverra nam libero justo 
                        laoreet. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. 
                        Pellentesque nec nam aliquam sem et tortor consequat id. Nibh venenatis 
                        cras sed felis. Ac tincidunt vitae semper quis. Vulputate enim nulla aliquet 
                        porttitor lacus luctus. Condimentum lacinia quis vel eros. 
                    </p>
                </div>
            </div>
            <div className="about__call-text">You can ask questions or participate in the project here</div>
            <div className="about__contacts-container">
                <Contacts></Contacts>
            </div>
        </section>
    );
};

export default About; 