

function draw_one_frame(cur_frac) {
    //Background
    fill(255, 255, 255);
    rect(0, 0, width, height);

    let b1_y = height/2; //0.55 * height;
    let b1_size = 50;
    let numCols = 40;
    let numRows = 20;
    let cellWidth = width*1.1 / numCols;
    let cellHeight = height*1.1 / numRows;
    let startX = -30;
    let startY = height / 2;
    let direction = 1; // 1 for moving right, -1 for moving left

    //Draw the grid, switch grid to true.
    let grid = false;
    if(grid){
        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row < numRows; row++) {
                let x = startX + col * cellWidth;
                let y = startY + (row - numRows / 2) * cellHeight;
                let current_position = { x, y };

                rect(x, y, cellWidth, cellHeight);
            }
        }
    }


    // // Draw the line
    if(cur_frac == 0){
        start = true;
    }
    if(start && !isFinish){
        for (let col = 0; col < drawnCols; col++) {
            for (let row = 0; row < numRows; row++) {
                let x = startX + col * cellWidth;
                let y = startY + (row - numRows / 2) * cellHeight;
                let current_position = { x, y };
                
                

                

                // If the position doesn't exist in the trail array, push it
                if (!isInTrail(current_position) && row == numRows/2) {
                    trail.push(current_position);
                }
            }
        }
    }

    // Update drawnCols based on the current fraction
    if (cur_frac > 0 && cur_frac <= 1) {
        drawnCols = Math.floor(cur_frac * (numCols+2)); // Increase drawnCols as per the fraction
    }

    if(!isFinish){
        for (let i = 0; i < trail.length; i++) {
            let pos = trail[i];
            fill(255, 0, 0);
            rect(pos.x, pos.y, cellWidth, cellHeight);
        }
    }
    //console.log("/nDRAWN RECT: ",drawnCols);
    if (drawnCols === totalRectangles) {
        isFinish = true;
    }

    if(isFinish){
        for (let i = 0; i < trail.length; i++) {
            let pos = trail[i];
            fill(255, 0, 0);
            rect(pos.x, pos.y, cellWidth, cellHeight);
        }
        trail.shift();

       if(trail.length == 0){
        resetVars();
       }
    }

   


    //console.log("LENGTH: ",trail.length);
    //console.log("DRawnCOls: ",drawnCols);

  
    //*********GRID ^^^  1ST TEST vvvv *****************
 
	//console.log(cur_frac);
    // Check if all rectangles have been drawn and removed
	// if(cur_frac == 0){
	// 	start = true;
	// }

    // if (start && drawnRectangles < totalRectangles) {
    //     let x = map(cur_frac, 0, 1, -0.30 * width, 1.05 * width);
    //     let y = b1_y;
    //     let current_position = { x, y };
    //     trail.push(current_position);

    //     fill(255, 0, 0);
    //     noStroke();
    //     for (let i = 0; i < trail.length; i++) {
    //         let pos = trail[i];
    //         rect(pos.x, pos.y, b1_size, b1_size);
    //     }
    //     drawnRectangles++;
        
    //     if (drawnRectangles === totalRectangles) {
    //         isFinish = true;
    //         removedRectangles = 0;
    //     }
    // }

    // // Remove the rectangles one by one from left to right
    // if (isFinish && removedRectangles < drawnRectangles) {
    //     fill(255, 0, 0);
    //     noStroke();
    //     for (let i = removedRectangles; i < trail.length; i++) {
    //         let pos = trail[i];
    //         rect(pos.x, pos.y, b1_size, b1_size);
    //     }
    //     removedRectangles++;

    //     if (removedRectangles === totalRectangles) {
    //         isFinish = false;
	// 		drawnRectangles = 0;
	// 		trail = [];
	// 		start = false;
    //     }
    // }

    // if (trail.length > 100) {
    //     trail.shift(); // Remove the oldest position if the trail exceeds 100 positions
    // }
}

function resetVars(){
    drawnCols = 0;
    trail = [];
    isFinish = false;
    start = false;

}

function isInTrail(position) {
    for (let i = 0; i < trail.length; i++) {
        if (trail[i].x === position.x && trail[i].y === position.y) {
            return true;
        }
    }
    return false;
}