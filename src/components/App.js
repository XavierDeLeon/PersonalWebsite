import './App.css';
import { useState } from "react";
import About from './about/about.js';
import MusicSection from './music/music.js';

export default function App() {

  const [pageIndex, updatePageIndex] = useState(0);
  const pages = ["header",  "music"];

  const goHome = () => {
      updatePageIndex(0);
  }

  const nextPage = () => {
    if (pageIndex + 1 < pages.length) {
      updatePageIndex(pageIndex + 1);
    } else {
      updatePageIndex(pages.length - 1);
    }
  }

  //refactor arrows into separate js file
  return (
    <div className="App">

      <div className='return-to-home' style={{display: pageIndex === 0 ? "none" : "block"}}>
        <div className='return-text'>
          <p className='caret-up' onClick={goHome}><span>Return</span>&ensp;<i className="fa-solid fa-turn-up"></i></p>
        </div>
      </div>
      <div className="page-container">
        <div className="header-container" style={{
          display: pages[pageIndex] === "header" ? "block" : "none", 
        }}>
          <div className="Header">
          <header className="Header-site">
            <div className="placeholder"><span>&nbsp;</span></div>
            <div className="Header-text">
              <h1>X.O</h1>
              <p>music</p>
            </div>
            <div className="placeholder"><span>&nbsp;</span></div>
            <div className="Header-caret-down-block" onClick={nextPage}>
              <p className="Header-scroll-for-more">Continue to song gallery</p>
              <p className="Header-caret-down-1"><i className="fas fa-caret-down"></i></p>
            </div>
          </header>
        </div>
        </div>
        <div className="about-container" style={{
          display: pages[pageIndex] === "about" ? "block" : "none",
        }}>
          <About />
        </div>
        <div className="music-section-container" style={{
          display: pages[pageIndex] === "music" ? "block" : "none", 
        }}>
          <MusicSection />
        </div>
      </div>


    </div>
  );
}

