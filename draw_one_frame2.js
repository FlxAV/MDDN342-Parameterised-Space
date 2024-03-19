function draw_one_frame(cur_frac) {

    console.log("runing");
    fill(255);
    rect(0, 0, width, height);
   
    
    let num_cols = 9;  //18
    let num_rows = 4;  //8

    let circleWidth = width / num_cols;
    let circleHeight = height / num_rows;

    for (let i = 0; i < num_cols; i++) {
        for (let j = 0; j < num_rows; j++) {
            let x = (i + 0.5) * circleWidth;
            let y = (j + 0.5) * circleHeight;
            let expansionRate = map(noise(x * 0.01, y * 0.01), 0, 1, 1, 5); // Adjust the noise scale as needed
            circles_2.push(new Circle(x, y, expansionRate));
            console.log("pushing");
        }
    }

    console.log("array LENGTH: ",circles.length);

     // Expand and draw circles
    noStroke();
    fill(0);
    for (let i = 0; i < circles_2.length; i++) {
        circles_2[i].expand();
        circles_2[i].draw();
        console.log("drawing");
    }

     // Remove circles that are fully expanded
     for (let i = circles.length - 1; i >= 0; i--) {
        if (circles[i].isFullyExpanded()) {
            circles.splice(i, 1);
        }
    }

}


// Define a Circle class
class Circle {
    constructor(x, y, expansionRate) {
        this.x = x;
        this.y = y;
        this.expansionRate = expansionRate;
        this.diameter = 0;
    }

    // Function to expand the circle
    expand() {
        this.diameter += this.expansionRate;
    }

    // Function to check if the circle is fully expanded
    isFullyExpanded() {
        return this.diameter >= max(width, height);
    }

    // Function to draw the circle
    draw() {
        fill(0);
        ellipse(this.x, this.y, this.diameter);
    }
}