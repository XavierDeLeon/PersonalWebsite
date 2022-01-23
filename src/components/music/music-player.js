import "./music-player.css";
import aPlaceToCallHomeUrl from "../../assets/audio/A-Place-to-Call-Home.mp3"
import aPlaceToCallHomeImgUrl from "../../assets/images/A-Place-to-Call-Home.jpg"
import cometUrl from "../../assets/audio/Comet.mp3"
import cometImgUrl from "../../assets/images/Comet.jpg"

export default function MusicPlayer() {

    // music navigation vars
    let currentSong = 0;
    const musicMap = new Map();
    const musicNav = ["A Place to Call Home", "Comet"];

    musicMap.set("A Place to Call Home", {"audio": aPlaceToCallHomeUrl, "image": aPlaceToCallHomeImgUrl});
    musicMap.set("Comet", {"audio": cometUrl, "image": cometImgUrl});

    const playOrStop = () => {
        if (document.getElementById("src").paused){
            document.getElementById("src").play();
        } else {
            document.getElementById("src").pause();
        }
    }

    const changeMusic = () => {
        currentSong = currentSong + 1 < musicNav.length ? currentSong + 1 : 0;
        document.getElementById("src").src = musicMap.get(musicNav[currentSong])["audio"];
        document.getElementById("player").style.backgroundImage = `url(${musicMap.get(musicNav[currentSong])["image"]})`;
        document.getElementById("music-title").textContent = musicNav[currentSong];
    }

    return (
        <>
            <h2 id="music-title">A Place to Call Home</h2>
            <div className="music-player">
                <div className="left-arrow" onClick={changeMusic}>&#x2190;</div>
                <div id="player" className="player" onClick={playOrStop}>
                    <audio id="src" src={aPlaceToCallHomeUrl} controls/>
                </div>
                <div className="right-arrow" onClick={changeMusic}>&#x2192;</div>
            </div>
        </>
    );
}