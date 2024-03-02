

function draw_one_frame(cur_frac) {
    //Background
    fill(255, 255, 255);
    rect(0, 0, width, height);

    let b1_y = height/2; //0.55 * height;
    let b1_size = 50;

 
	//console.log(cur_frac);
    // Check if all rectangles have been drawn and removed
	if(cur_frac == 0){
		start = true;
	}

    if (start && drawnRectangles < totalRectangles) {
        let x = map(cur_frac, 0, 1, -0.30 * width, 1.05 * width);
        let y = b1_y;
        let current_position = { x, y };
        trail.push(current_position);

        fill(255, 0, 0);
        noStroke();
        for (let i = 0; i < trail.length; i++) {
            let pos = trail[i];
            rect(pos.x, pos.y, b1_size, b1_size);
        }
        drawnRectangles++;
        
        if (drawnRectangles === totalRectangles) {
            isFinish = true;
            removedRectangles = 0;
        }
    }

    // Remove the rectangles one by one from left to right
    if (isFinish && removedRectangles < drawnRectangles) {
        fill(255, 0, 0);
        noStroke();
        for (let i = removedRectangles; i < trail.length; i++) {
            let pos = trail[i];
            rect(pos.x, pos.y, b1_size, b1_size);
        }
        removedRectangles++;

        if (removedRectangles === totalRectangles) {
            isFinish = false;
			drawnRectangles = 0;
			trail = [];
			start = false;
        }
    }

    if (trail.length > 100) {
        trail.shift(); // Remove the oldest position if the trail exceeds 100 positions
    }
}
