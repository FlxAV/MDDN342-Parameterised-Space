function draw_one_frame(cur_frac) {

    //console.log("runing");

    if (!setupComplete) { // Run setup code only once
        let num_cols = 9; // Adjust the number of columns as needed
        let num_rows = 4; // Adjust the number of rows as needed
        let noiseScale = 0.4; // Adjust the noise scale as needed

        let circleWidth = width / num_cols;
        let circleHeight = height / num_rows;

        let maxExpansionRate = 30; // Maximum expansion rate
        let minExpansionRate = 1; // Minimum expansion rate

        noiseSeed(200); // Set a consistent noise seed for reproducibility

        for (let i = 0; i < num_cols; i++) {
            for (let j = 0; j < num_rows; j++) {
                let x = (i + 0.5) * circleWidth;
                let y = (j + 0.5) * circleHeight;
                
                // Adjust the expansion rate based on the noise value
                let noiseValue = noise(x * noiseScale, y * noiseScale);
                let expansionRate = map(noiseValue, 0, 1, minExpansionRate, maxExpansionRate);

                circles_2.push(new Circle(x, y, expansionRate));
                //console.log("pushing");
            }
        }

        setupComplete = true; // Set flag to true after setup code is executed
    } //preload

    if(switch_02){
        fill(255);
    }else{
        fill(0);
    }

    //fill(255);
    rect(0, 0, width, height);
   

    //console.log("array LENGTH: ",circles.length);

     // Expand and draw circles
    noStroke();

    if(switch_02){
        fill(0);
    }else{
        fill(255);
    }
    //fill(0);
    for (let i = 0; i < circles_2.length; i++) {
        circles_2[i].expand();
        circles_2[i].draw();
        console.log("drawing");
    }

    if(cur_frac>0.95){
        circles_2 = [];
        setupComplete = false;
        switch_02 = !switch_02;
    }

     // Remove circles that are fully expanded
     for (let i = circles_2.length - 1; i >= 0; i--) {
        if (circles_2[i].isFullyExpanded()) {
            circles_2.splice(i, 1);
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
        return this.diameter >=  width/2  ;//max(width, height);
    }

    // Function to draw the circle
    draw() {
       // fill(0);
        ellipse(this.x, this.y, this.diameter);
    }
}