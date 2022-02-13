import "./music-player.css";
import { useState } from "react";
import musicData from "../../api/data.js";
import Visualizer from "./visualizer";
import CustomControls from "./custom-controls";

export default function MusicPlayer() {

    const [visualizerStyle, setVisualizer] = useState("Bars");
    const tracks = musicData;

    return (
        <>
            <CustomControls tracks={tracks} currentVisualizer={visualizerStyle} onChangeVisualizer={setVisualizer}/>
            <Visualizer visualizerStyle={visualizerStyle}/>
        </>
        
    );
}