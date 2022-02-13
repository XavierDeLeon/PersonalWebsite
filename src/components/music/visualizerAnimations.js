function visualizerAnimations() {

    return {
        Bars: (ctx, canvas, bufferLength, barWidth, dataArray) => {
            let horizontalScale = 0.5;
            let verticalScale = 0.5;
            let reflectionCompressionRatio = 0.5;
            let padding = 5;

            let topLeftX = (canvas.width / 2) - padding/2;
            let topRightX = (canvas.width / 2) + padding/2;
            let bottomLeftX = (canvas.width / 2) - padding/2;
            let bottomRightX = (canvas.width / 2) + padding/2;

            // we floor all the coordinates for better performance, canvas doesn't like floating-point coordinates
            for (let i = 0; i < bufferLength; i++){
                let barHeight = dataArray[i];
                ctx.fillStyle = '#f5fbef';
                //top right
                ctx.fillRect(
                    ~~(topRightX), // x
                    ~~(canvas.height / 2), // y start from half of screen
                    ~~(barWidth * horizontalScale), // width
                    ~~((barHeight * -1) * verticalScale) // height is multiplied by negative to go upwards
                );

                //top left
                ctx.fillRect(
                    ~~(topLeftX), // x
                    ~~(canvas.height / 2), // y start from half of screen
                    ~~(barWidth * horizontalScale) * -1, // width, negative to draw towards left
                    ~~((barHeight * -1) * verticalScale)// height is multiplied by negative to go upwards
                );

                // REFLECTION
                ctx.fillStyle = `rgba(255, 255, 255, 0.5)`;

                //bottom right
                ctx.fillRect(
                    ~~(bottomRightX), // x
                    ~~(canvas.height / 2), // y start from half of screen
                    ~~(barWidth * horizontalScale), // width
                    ~~(barHeight * verticalScale * reflectionCompressionRatio) // bottom reflection should be shorter
                );

                //bottom LEFT
                ctx.fillRect(
                    ~~(bottomLeftX), // x
                    ~~(canvas.height / 2), // y start from half of screen
                    ~~(barWidth * horizontalScale) * -1, // width, negative to draw towards left
                    ~~(barHeight * verticalScale * reflectionCompressionRatio) // bottom reflection should be shorter
                );

                topRightX += ~~(barWidth * horizontalScale) + padding; // add gap
                topLeftX -= ~~(barWidth * horizontalScale) + padding; // add gap
                bottomRightX += ~~(barWidth * horizontalScale) + padding; // add gap
                bottomLeftX -= ~~(barWidth * horizontalScale) + padding; // add gap
            }
        },
        Lines: (ctx, canvas, bufferLength, lineLength, dataArray) => {
            let horizontalScale = 0.5;
            let verticalScale = 0.5;
            let reflectionCompressionRatio = 0.5;
            let padding = 5;

            let rightOriginX = (canvas.width / 2);
            let lefttOriginX = (canvas.width / 2);
            let originY = (canvas.height / 2);

            let rightCoordinates = [{x: rightOriginX, y: originY}]
            let leftCoordinates = [{x: lefttOriginX, y: originY}]
            
            // store coordinates
            for (let i = 0; i < bufferLength; i++){
                rightOriginX += lineLength;
                rightCoordinates.push({x: rightOriginX, y: originY - (dataArray[i] * verticalScale)});

                lefttOriginX -= lineLength;
                leftCoordinates.push({x: lefttOriginX, y: originY - (dataArray[i] * verticalScale)});
            }

            //draw line
            for (let i = 0; i + 1 < rightCoordinates.length; i++){
                // right line
                ctx.beginPath();
                ctx.moveTo(rightCoordinates[i].x, rightCoordinates[i].y);
                ctx.lineTo(rightCoordinates[i + 1].x, rightCoordinates[i + 1].y);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#f5fbef';
                ctx.stroke();

                // left line
                ctx.beginPath();
                ctx.moveTo(leftCoordinates[i].x, leftCoordinates[i].y - 1);
                ctx.lineTo(leftCoordinates[i + 1].x, leftCoordinates[i + 1].y - 1);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#f5fbef';
                ctx.stroke();
            }
        }
    }
}

function getVisualizerKeys() {
    return Object.keys(visualizerAnimations());
}

export {
    visualizerAnimations,
    getVisualizerKeys
}