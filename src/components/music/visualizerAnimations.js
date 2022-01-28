function visualizerAnimations() {

    return {
        default: (ctx, canvas, bufferLength, barWidth, dataArray) => {
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
        }
    }
}

export {
    visualizerAnimations
}