import React from "react";
import "./custom-controls.css";

export default class CustomControls extends React.Component {

    constructor(props) {
        super(props);
        this.trackIndex = 0; //start from the first track
        this.tracks = props.tracks;
        this.audioElem = null;
        this.prevButton = null;
        this.nextButton = null;
        this.playButton = null;
        this.pauseButton = null;
        this.timeSlider = null;
        //time listener
        this.timeListener = null;

        this.state = {
            playing: false,
            currentTrack: this.tracks[this.trackIndex],
            duration: 0,
            currentTime: 0,
            currentTimeString: "0:00 / 0:00"
        }

        //bind for scope
        this.previousSong = this.previousSong.bind(this);
        this.playSong = this.playSong.bind(this);
        this.pauseSong = this.pauseSong.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.setTime = this.setTime.bind(this);
        console.log(this.tracks);
    }

    componentDidMount() {
        this.audioElem = document.getElementById("src");
        this.prevButton = document.getElementById("prev");
        this.nextButton = document.getElementById("next");
        this.playButton = document.getElementById("play");
        this.pauseButton = document.getElementById("pause");

        this.timeSlider = document.getElementById("time-slider");
    }

    //note: updateTimer will make this function run every second
    componentDidUpdate() {
    }

    previousSong() {
        if (this.trackIndex - 1 >= 0) {
            this.trackIndex = this.trackIndex - 1
        } else {
            this.trackIndex = this.tracks.length - 1;
        }
        this.setState({
            playing: false,
            currentTrack: this.tracks[this.trackIndex]
        });
        // console.log("previous song", this.state.currentTrackURL, this.trackIndex);
    }

    nextSong() {
        if (this.trackIndex + 1 < this.tracks.length) {
            this.trackIndex = this.trackIndex + 1
        } else {
            this.trackIndex = 0;
        }
        this.setState({
            playing: false,
            currentTrack: this.tracks[this.trackIndex]
        });
        // console.log("next song", this.state.currentTrackURL, this.trackIndex);
    }

    playSong() {
        this.setState({
            playing: true
        });
        this.audioElem.play();
        console.log("playing song", this.state.currentTrack, this.trackIndex);
    }

    pauseSong() {
        this.setState({
            playing: false
        });
        this.audioElem.pause();
        console.log("pause song");
    }

    setTime() {
        this.audioElem.currentTime = this.timeSlider.value / 1000; //we divide by 1000 because time in slider is in milliseconds, while element accepts seconds
    }

    updateTime() {
        clearInterval(this.timeListener);
        this.timeListener = setInterval(() => {
            let currentTime = this.audioElem.currentTime;
            let duration = this.audioElem.duration;
            let formattedCurrentTime = `${~~(currentTime / 60)}:${("0" + (~~currentTime % 60)).slice(-2)}`;
            let formattedDuration = `${~~(duration / 60)}:${("0" + (~~duration % 60)).slice(-2)}`;
            this.setState({
                duration: duration * 1000, //multiply by 1000 for accuracy
                currentTime: currentTime * 1000, //multiply by 1000 for accuracy
                currentTimeString: `${formattedCurrentTime} / ${formattedDuration}`
            });
        }, 100)
    }

    render() {
        return (
            <>
                <audio id="src" src={this.state.currentTrack.audio} onLoadedMetadata={this.updateTime}/>
                <div className="image-container">
                    <img id="album-art" src={this.state.currentTrack.image}></img>
                </div>
                <div id="custom-controls" className="custom-controls-container">
                    <div className="custom-controls-buttons">
                        <div className="button-group">
                            <p class="title">{this.state.currentTrack.title}&nbsp;-&nbsp;{this.state.currentTrack.artist}</p>
                        </div>
                        <div className="button-group">
                            <button id="prev" onClick={this.previousSong}><i className="fa fa-step-backward" aria-hidden="true"></i></button>
                            <button id="play" onClick={this.playSong} style={{display: this.state.playing ? "none" : "inline-block"}}><i  className="fa fa-play" aria-hidden="true"></i></button>
                            <button id="pause" onClick={this.pauseSong} style={{display: this.state.playing ? "inline-block" : "none"}}><i className="fa fa-pause" aria-hidden="true"></i></button>
                            <button id="next" onClick={this.nextSong}><i className="fa fa-step-forward" aria-hidden="true"></i></button>
                        </div>
                        <div className="button-group">
                            <button><i class="fas fa-list"></i></button>
                        </div>
                    </div>
                    <div className="custom-controls-track">
                        <span id="current-time">{this.state.currentTimeString}</span>
                        <input id="time-slider" type="range" min="0" max={this.state.duration} value={this.state.currentTime} onChange={this.setTime}/>
                    </div>
                </div>
            </>
            
        );
    }

}