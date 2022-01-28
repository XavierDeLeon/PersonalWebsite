import React from "react";
import "./visualizer.css";
import * as animations from "./visualizerAnimations"
export default class Visualizer extends React.Component {

    constructor(props){
        super(props);
        this.ctx = null;
        this.audioElem = null;
        this.audioSrc = null;
        this.analyzer = null;
        this.contextInitialized = false;
        this.animations = animations.visualizerAnimations();
        this.colorMap = new Map();
        this.state = {
            visualizerStyle: props.visualizerStyle
        };
    }

    componentDidUpdate() {
        if (document.getElementById("src") && !this.contextInitialized) {
            this.audioElem = document.getElementById("src");
            this.visualizeAudio(this.audioElem, document.getElementById("visualizer"));
            this.contextInitialized = true;
            window.addEventListener("resize", () => {
                //resize
                document.getElementById("visualizer").width = document.body.scrollWidth;
                document.getElementById("visualizer").height = document.body.scrollHeight;
            })
        }
    }

    initAudioContext(audioElem, canvas){
        console.log("initializing context");
        canvas.width = document.body.scrollWidth;
        canvas.height = document.body.scrollHeight;
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
        let _this = this;
    
        function animate() {
            _this.ctx.clearRect(0, 0, canvas.width, canvas.height);

            // //color of background
            // _this.ctx.fillStyle = `rgb(${_this.rgb.r}, ${_this.rgb.g}, ${_this.rgb.b})`;
            // _this.ctx.fillRect(0, 0, canvas.width, canvas.height);

            _this.analyzer.getByteFrequencyData(dataArray);
            _this.animations[animationStyle](_this.ctx, canvas, bufferLength, barWidth, dataArray);
            requestAnimationFrame(animate);
        }
        animate();
    }

    getAverageRGB(imgEl) {
    
        let blockSize = 5, // only visit every 5 pixels
            defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r:0,g:0,b:0},
            count = 0;

        if (!context) {
            return defaultRGB;
        }
        
        height = canvas.height = imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.offsetWidth || imgEl.width;
        
        context.drawImage(imgEl, 0, 0);
        
        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            console.log("not working");
            return defaultRGB;
        }
        
        length = data.data.length;
        
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);

        canvas.remove();

        return rgb;
        
    }

    componentDidMount() {
        document.getElementById("album-art").onload = () => {
            let key = document.getElementById("album-art").src;
            if (!this.colorMap.get(key)){
                this.colorMap.set(key, this.getAverageRGB(document.getElementById("album-art")));
            } 
            this.rgb = this.colorMap.get(key);
            document.getElementsByClassName("App")[0].style.backgroundColor = `rgb(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b})`;
        };
    }

    render() {
        return <canvas id="visualizer" className="visualizer"></canvas>;
    }

}