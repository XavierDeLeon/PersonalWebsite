function visualizerAnimations() {
    let func = null;

    return {
        default: (ctx, canvas, bufferLength, x, barWidth, dataArray) => {
            let originalX = x;
            let topLeftX = (canvas.width / 2);
            let topRightX = originalX + (canvas.width / 2);
            let bottomRightX = originalX + (canvas.width / 2);
            let bottomLeftX = (canvas.width / 2);

            for (let i = 0; i < bufferLength; i++){
                let barHeight = dataArray[i];
                ctx.fillStyle = 'white';
                //top right
                ctx.fillRect(
                    topRightX, // x
                    canvas.height / 2, // y start from bottom of screen
                    barWidth * 0.5, // width
                    (barHeight * -1) * 0.5// height is multiplied by negative to go upwards
                );
                //top left
                ctx.fillRect(
                    topLeftX, // x
                    canvas.height / 2, // y start from bottom of screen
                    barWidth * 0.5, // width
                    (barHeight * -1) * 0.5// height is multiplied by negative to go upwards
                );

                // REFLECTION
                ctx.fillStyle = "#ADADAD";

                //bottom right
                ctx.fillRect(
                    bottomRightX, // x
                    canvas.height / 2, // y start from bottom of screen
                    barWidth * 0.5, // width
                    barHeight * 0.5// height
                );

                //bottom LEFT
                ctx.fillRect(
                    bottomLeftX, // x
                    canvas.height / 2, // y start from bottom of screen
                    barWidth * 0.5, // width
                    barHeight * 0.5// height
                );

                topRightX += barWidth * 0.5 + 5; // add gap
                topLeftX -= barWidth * 0.5 + 5; // add gap
                bottomRightX += barWidth * 0.5 + 5; // add gap
                bottomLeftX -= barWidth * 0.5 + 5; // add gap
            }
        }
    }
}

export {
    visualizerAnimations
}