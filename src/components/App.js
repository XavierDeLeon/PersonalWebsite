import './App.css';
import React from "react";
import Header from './header/header.js';
import About from './about/about.js';
import MusicSection from './music/music.js';

export default function App() {

  return (
    <div className="App">
      <Header />
      <About />
      <MusicSection />
    </div>
  );
}

