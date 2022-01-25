import "./music-player.css";
import { useRef, useEffect, useState } from "react";

// A Place to Call Home
import aPlaceToCallHomeUrl from "../../assets/audio/A-Place-to-Call-Home.mp3"
import aPlaceToCallHomeImgUrl from "../../assets/images/A-Place-to-Call-Home.jpg"
// Comet
import cometUrl from "../../assets/audio/Comet.mp3"
import cometImgUrl from "../../assets/images/Comet.jpg"
// Smile
import smileUrl from "../../assets/audio/Smile.mp3"
import smileImgUrl from "../../assets/images/Smile.jpg"
import Visualizer from "./visualizer";

export default function MusicPlayer() {

    // music navigation vars
    const [songIndex, updateSongIndex] = useState(0);
    const songArr = [ //important: tracklist goes in order
        {
            "title": "A Place to Call Home", 
            "audio": aPlaceToCallHomeUrl, 
            "image": aPlaceToCallHomeImgUrl,
            "about": "The reason I wrote this song was actually pretty cheesy. My girlfriend went to South Korea to study abroad and since she was feeling nervous, I wanted to make a song that would make her feel better. Unfortunately, I was only actually able to complete this song well after she got back. Nonetheless I put all the feelings I had back then and put them into this song."
        },
        {
            "title": "Comet",
            "audio": cometUrl, 
            "image": cometImgUrl,
            "about": "This song was written when I was thinking about past experiences with friends and how we've all grown up since then. It's a bittersweet song about those fleeting moments and how much you should cherish them."
        },
        {
            "title": "Smile",
            "audio": smileUrl, 
            "image": smileImgUrl,
            "about": "I actually wrote this one to cheer myself up. Things weren't working out as I hoped and I got into a little bit of a slump. I watched Kiki's Delivery Service and something about that inspired me to make this song to remind myself to smile. Hence the sound clips and album art."
        },
    ];

    const playerElem = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        let handleResize = () => {
            setHeight(playerElem.current.clientWidth);
        }

        setHeight(playerElem.current.clientWidth);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });

    // const initVisualizer = () => {
    //     visualizeAudio(document.getElementById("src"), document.getElementById("visualizer"));
    // }

    const playOrStop = () => {
        if (document.getElementById("src").paused){
            document.getElementById("src").play();
        } else {
            document.getElementById("src").pause();
        }
    }

    const prevSong = () => {
        if (songIndex - 1 >= 0) {
            updateSongIndex(songIndex - 1);
        } else {
            updateSongIndex(songArr.length - 1);
        }
    }

    const nextSong = () => {
        if (songIndex + 1 < songArr.length) {
            updateSongIndex(songIndex + 1);
        } else {
            updateSongIndex(0);
        }
    }

    return (
        <>
            <div class="controls">
                
                <div ref={playerElem} id="player" className="player" >
                    <img id="album-art" src={songArr[songIndex]["image"]}></img>
                </div>
                <div class="audio-player">
                    <div className="details">
                        <h2>{songArr[songIndex]["title"]}</h2>
                        <div className="arrows">
                            <div className="right-arrow" onClick={prevSong}>&#171;</div>
                            <div className="right-arrow" onClick={nextSong}>&#187;</div>
                        </div>
                    </div>
                    <audio id="src" src={songArr[songIndex]["audio"]} controls/>
                </div>
            </div>
            <Visualizer visualizerStyle={{}}/>
        </>
        
    );
}