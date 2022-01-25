import React from "react";
import "./visualizer.css";

export default class Visualizer extends React.Component {

    constructor(props){
        super(props);
        this.ctx = null;
        this.audioElem = null;
        this.audioSrc = null;
        this.analyzer = null;
        this.contextInitialized = false;
        this.state = {
            visualizerStyle: props.visualizerStyle
        };
    }

    componentDidUpdate(previousProps, previousState) {
        if (document.getElementById("src") && !this.contextInitialized) {
            this.audioElem = document.getElementById("src");
            this.visualizeAudio(this.audioElem, document.getElementById("visualizer"));
            this.contextInitialized = true;
        }
    }

    initAudioContext(audioElem, canvas){
        console.log("initializing context");
        canvas.width = document.body.scrollWidth;
        canvas.height = 0.2 * document.body.scrollHeight;
        this.ctx = canvas.getContext('2d');
        let audioContext;
        if (audioContext == undefined) {
            audioContext = new AudioContext();
        }
        this.audioSrc = audioContext.createMediaElementSource(audioElem);
        this.analyzer = audioContext.createAnalyser();
        this.audioSrc.connect(this.analyzer);
        this.analyzer.connect(audioContext.destination);
    }

    visualizeAudio(audioElem, canvas, animationStyle = "default"){
        
        this.initAudioContext(audioElem, canvas);
        this.analyzer.fftSize = 128;
    
        const bufferLength = this.analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
    
        const barWidth = canvas.width/bufferLength;
        let barHeight;
        let x;
        let _this = this;
    
        function animate() {
            x = 0;
            _this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            _this.analyzer.getByteFrequencyData(dataArray);
            for (let i = 0; i < bufferLength; i++){
                barHeight = dataArray[i];
                _this.ctx.fillStyle = 'white';
                _this.ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x+= barWidth + 10; // add gap
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    componentDidMount() {
        
    }

    render() {
        return <canvas id="visualizer" className="visualizer"></canvas>;
    }

}