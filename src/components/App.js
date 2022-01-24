import './App.css';
import { useRef, useEffect, useState } from "react";
import About from './about/about.js';
import MusicSection from './music/music.js';

export default function App() {

  const [pageIndex, updatePageIndex] = useState(0);
  const pages = ["header", "about", "music"];

  const prevPage = () => {
    if (pageIndex - 1 > 0) {
      updatePageIndex(pageIndex - 1);
    } else {
      updatePageIndex(0);
    }
    console.log(pageIndex);
  }

  const nextPage = () => {
    if (pageIndex + 1 < pages.length) {
      updatePageIndex(pageIndex + 1);
    } else {
      updatePageIndex(pages.length - 1);
    }
    console.log(pageIndex);
  }

  return (
    <div className="App">
      <div class="previous-page-arrow" onClick={prevPage} style={{
        display: pageIndex > 0 ? "flex" : "none"
      }}>&#x2039;</div>

      <div className="page-container" style={{
        width: pageIndex > 0 ? "80%" : "100%"
      }}>
        <div className="header-container" style={{
          display: pages[pageIndex] === "header" ? "block" : "none"
        }}>
          <div className="Header">
          <header className="Header-site">
            <h1 className="Header-text">X.O&ensp;
              <span className="Header-scroll-for-more" onClick={nextPage}>Click for more&nbsp;</span>
              <span className='Header-caret-right-1'>&gt;</span>
              <span className='Header-caret-right-2'>&gt;</span>
              <span className='Header-caret-right-3'>&gt;</span>
            </h1>
          </header>
        </div>
        </div>
        <div className="about-container" style={{
          display: pages[pageIndex] === "about" ? "block" : "none"
        }}>
          <About />
        </div>
        <div className="music-section-container" style={{
          display: pages[pageIndex] === "music" ? "block" : "none"
        }}>
          <MusicSection />
        </div>
      </div>

      <div class="next-page-arrow" onClick={nextPage} style={{
        display: pageIndex > 0 && pageIndex !== pages.length - 1 ? "flex" : "none"
      }}>&#x203A;</div>
    </div>
  );
}

