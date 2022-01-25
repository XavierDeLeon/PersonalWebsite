import './App.css';
import { useState } from "react";
import About from './about/about.js';
import MusicSection from './music/music.js';

export default function App() {

  const [pageIndex, updatePageIndex] = useState(1);
  const pages = ["about", "header",  "music"];

  const prevPage = () => {
    if (pageIndex - 1 > 0) {
      updatePageIndex(pageIndex - 1);
    } else {
      updatePageIndex(0);
    }
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
      <div className="previous-page-arrow" onClick={prevPage} style={{
        display: pageIndex > 0 ? "flex" : "none"
      }}>&#x2039;</div>

      <div className="page-container" style={{
        width: pageIndex > 0 ? "80%" : "100%"
      }}>
        <div className="header-container" style={{
          display: pages[pageIndex] === "header" ? "block" : "none", 
        }}>
          <div className="Header">
          <header className="Header-site">
            <h1 className="Header-text">X.O</h1>
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

      <div className="next-page-arrow" onClick={nextPage} style={{
        display: pageIndex >= 0 && pageIndex !== pages.length - 1 ? "flex" : "none"
      }}>&#x203A;</div>
    </div>
  );
}

