import "./music.css";
import MusicPlayer from "./music-player";

export default function MusicSection() {
    return (
        <div className="music-body">
            <div className="music-player-container">
                <MusicPlayer />
            </div>
        </div>
    );
}
