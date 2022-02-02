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
            autoPlay: false,
            shuffle: false,
            duration: 0,
            currentTime: 0,
            currentTimeString: "0:00 / 0:00"
        }

        //bind for scope
        this.previousSong = this.previousSong.bind(this);
        this.loadAndPlay = this.loadAndPlay.bind(this);
        this.playSong = this.playSong.bind(this);
        this.pauseSong = this.pauseSong.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.setRepeat = this.setRepeat.bind(this);
        this.setShuffle = this.setShuffle.bind(this);
        this.goToTrack = this.goToTrack.bind(this);
        this.setTime = this.setTime.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
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

    /**
     * We should be able to skip back to start of song if user goes to previous song after a certain threshold.
     */
    previousSong() {
        let thresholdToSkip = 2; // this is in seconds
        if (this.audioElem.currentTime > thresholdToSkip){
            this.audioElem.currentTime = 0;
        } else {
            if (this.trackIndex - 1 >= 0) {
                this.trackIndex = this.trackIndex - 1
            } else {
                this.trackIndex = this.tracks.length - 1;
            }
            this.setState({
                playing: false,
                currentTrack: this.tracks[this.trackIndex]
            });
        }
        
        // console.log("previous song", this.state.currentTrackURL, this.trackIndex);
    }

    loadAndPlay() {
        let waitForLoad = setInterval(()=> {
            console.log("loading");
            if (this.audioElem.readyState > 1) {
                console.log("loaded");
                this.playSong();
                clearInterval(waitForLoad);
            }
        }, 0)
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
        
        if (this.state.autoPlay){
            this.loadAndPlay();
        }

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

    setRepeat() {
        this.setState({
            autoPlay: !this.state.autoPlay
        });
    }

    setShuffle() {
        this.setState({
            shuffle: !this.state.shuffle
        });
    }

    goToTrack(newTrackIndex) {
        this.trackIndex = newTrackIndex;
        this.setState({
            currentTrack: this.tracks[this.trackIndex]
        });
    }

    updateTime() {
        clearInterval(this.timeListener);
        this.timeListener = setInterval(() => {
            let currentTime = this.audioElem.currentTime;
            let duration = this.audioElem.duration;
            let formattedCurrentTime = `${~~(currentTime / 60)}:${("0" + (~~currentTime % 60)).slice(-2)}`;
            let formattedDuration = `${~~(duration / 60)}:${("0" + (~~duration % 60)).slice(-2)}`;
            this.setState({
                duration: duration * 1000, // converted to ms for smoother movement in the slider
                currentTime: currentTime * 1000, // converted to ms for smoother movement in the slider
                currentTimeString: `${formattedCurrentTime} / ${formattedDuration}`
            });
        }, 100)
    }

    handleEnded() {
        if (this.state.autoPlay) {
            this.nextSong();
            this.loadAndPlay();
        } else {
            this.pauseSong();
        }
    }

    render() {
        return (
            <>
                <audio id="src" src={this.state.currentTrack.audio} onLoadedMetadata={this.updateTime} onEnded={this.handleEnded}/>
                <div className="image-container">
                    <div className="spacer">&nbsp;</div>
                    <img id="album-art" alt={`${this.state.currentTrack.title} artwork`} src={this.state.currentTrack.image}></img>
                    <h2 className="title">{this.state.currentTrack.title}</h2>
                </div>
                <div id="custom-controls" className="custom-controls-container">
                    <div className="custom-controls-buttons">
                        <div className="button-group">
                        </div>
                        <div className="button-group">
                            <button id="prev" className="prev-button" onClick={this.previousSong}><i className="fa fa-step-backward" aria-hidden="true"></i></button>
                            <button id="play" className="play-button" onClick={this.playSong} style={{display: this.state.playing ? "none" : "inline-block"}}><i  className="fas fa-play" aria-hidden="true"></i></button>
                            <button id="pause" className="pause-button" onClick={this.pauseSong} style={{display: this.state.playing ? "inline-block" : "none"}}><i className="fa fa-pause" aria-hidden="true"></i></button>
                            <button id="next" className="next-button" onClick={this.nextSong}><i className="fa fa-step-forward" aria-hidden="true"></i></button>
                        </div>
                        <div className="button-group">
                            <div>
                                <button id="repeat" className={this.state.autoPlay ? "repeat-button selected" : "repeat-button"} onClick={this.setRepeat}><i className="fa-solid fa-repeat"></i></button>
                                <button id="playlist" className="playlist-toggle"><i className="fas fa-list"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="custom-controls-track">
                        <span id="current-time">{this.state.currentTimeString}</span>
                        <input id="time-slider" type="range" min="0" max={(this.state.duration) ? this.state.duration : 0} value={this.state.currentTime} onChange={this.setTime}/>
                    </div>
                </div>
            </>
            
        );
    }

}