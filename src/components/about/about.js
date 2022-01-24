import './about.css';
import Profile from "../../assets/images/profile.jpg"

export default function About() {
    return (
        <div className="About">
            <div className='About-left'>
                <h2>About Me</h2>
                <p className="About-text">
                    Hey there! My name is Xavier Ondevilla and I'm a 24-year-old full stack web developer based in the GTA.
                </p>
                <p className="About-text">
                    I graduated with Honours from Ryerson University with a BSc. in Computer Science and a concentration in software engineering. In a nutshell, I've worked with a lot of different languages and tools such as JavaScript, jQuery, React, NodeJS,
                    PHP, SQL and so on.
                </p>
                <p className="About-text">
                    When I'm not coding, I like to write a lot (and I mean a lot) of music. I'm also a hardcore audiophile; I'm always looking for the best speakers and headphones, despite my wallet's desperate pleas for help.
                </p>
            </div>
            <div className='About-right'>
                <img src={Profile} alt="Profile"></img>
            </div>
            
        </div>
    );
}