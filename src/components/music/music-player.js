import { useRef, useEffect, useState } from "react";
import "./music-player.css";
import Visualizer from "./visualizer";

// A Place to Call Home
import aPlaceToCallHomeUrl from "../../assets/audio/A-Place-to-Call-Home.mp3"
import aPlaceToCallHomeImgUrl from "../../assets/images/A-Place-to-Call-Home.jpg"
// Comet
import cometUrl from "../../assets/audio/Comet.mp3"
import cometImgUrl from "../../assets/images/Comet.jpg"
// Smile
import smileUrl from "../../assets/audio/Smile.mp3"
import smileImgUrl from "../../assets/images/Smile.jpg"
import CustomControls from "./custom-controls";

export default function MusicPlayer() {

    // music navigation vars
    const [songIndex, updateSongIndex] = useState(0);
    const songArr = [ //important: tracklist goes in order
        {
            "title": "A Place to Call Home", 
            "artist": "X.O",
            "audio": aPlaceToCallHomeUrl, 
            "image": aPlaceToCallHomeImgUrl,
            "about": "The reason I wrote this song was actually pretty cheesy. My girlfriend went to South Korea to study abroad and since she was feeling nervous, I wanted to make a song that would make her feel better. Unfortunately, I was only actually able to complete this song well after she got back. Nonetheless I put all the feelings I had back then and put them into this song."
        },
        {
            "title": "Comet",
            "artist": "X.O",
            "audio": cometUrl, 
            "image": cometImgUrl,
            "about": "This song was written when I was thinking about past experiences with friends and how we've all grown up since then. It's a bittersweet song about those fleeting moments and how much you should cherish them."
        },
        {
            "title": "Smile",
            "artist": "X.O",
            "audio": smileUrl, 
            "image": smileImgUrl,
            "about": "I actually wrote this one to cheer myself up. Things weren't working out as I hoped and I got into a little bit of a slump. I watched Kiki's Delivery Service and something about that inspired me to make this song to remind myself to smile. Hence the sound clips and album art."
        },
    ];

    return (
        <>
            <CustomControls tracks={songArr}/>
            <Visualizer visualizerStyle={{}}/>
        </>
        
    );
}