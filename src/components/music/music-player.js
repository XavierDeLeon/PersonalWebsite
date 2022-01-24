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
    let firstRender = false;

    useEffect(() => {
        let handleResize = () => {
            setHeight(playerElem.current.clientWidth);
        }

        if (!firstRender) {
            setHeight(playerElem.current.clientWidth);
            firstRender = true;
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });

    const playOrStop = () => {
        if (document.getElementById("src").paused){
            document.getElementById("src").play();
        } else {
            document.getElementById("src").pause();
        }
    }

    const changeSong = () => {
        if (songIndex + 1 < songArr.length) {
            updateSongIndex(songIndex + 1);
        } else {
            updateSongIndex(0);
        }
    }

    return (
        <div className="music-container">
            <div className="music-player">
                <div className="left-arrow" onClick={changeSong}>&#x2190;</div>
                <div ref={playerElem} id="player" 
                     className="player" 
                     style={{
                         backgroundImage: `url(${songArr[songIndex]["image"]})`,
                         backgroundSize: "contain",
                         height: `${height}px`
                     }} 
                     onClick={playOrStop}
                >
                    <audio id="src" src={songArr[songIndex]["audio"]} controls/>
                </div>
                <div className="right-arrow" onClick={changeSong}>&#x2192;</div>
            </div>
            <div className="music-player-details">
                <h2 id="music-title">{songArr[songIndex]["title"]}</h2>
                <hr></hr>
                <h3>About this song</h3>
                <p>&emsp;{songArr[songIndex]["about"]}</p>
            </div>
        </div>
    );
}