function draw_one_frame(cur_frac) {

    if (!setupComplete) { // Run setup code only once
        let num_cols = 9; // Adjust the number of columns as needed
        let num_rows = 4; // Adjust the number of rows as needed
        let noiseScale = 0.4; // Adjust the noise scale as needed

        let circleWidth = width / num_cols;
        let circleHeight = height / num_rows;

        let maxExpansionRate = map(height, 540, 1200, 80, 240); // Maximum expansion rate
        let minExpansionRate = map(height, 540, 1200, 1, 3);; // Minimum expansion rate

        noiseSeed(200); // Set a consistent noise seed for reproducibility

        for (let i = 0; i < num_cols; i++) {
            for (let j = 0; j < num_rows; j++) {
                let x = (i + 0.5) * circleWidth + random(-circleWidth / 2, circleWidth / 2); // Randomize x position
                let y = (j + 0.5) * circleHeight + random(-circleHeight / 2, circleHeight / 2); // Randomize y position
                
                // Adjust the expansion rate based on the noise value
                let noiseValue = noise(x * noiseScale, y * noiseScale);
                // Apply an exponential function to amplify the differences
                noiseValue = pow(noiseValue, 3); // You can adjust the exponent for desired effect
                let expansionRate = map(noiseValue, 0, 1, minExpansionRate, maxExpansionRate);

                circles_2.push(new Circle(x, y, expansionRate));
            }
        }

        setupComplete = true; // Set flag to true after setup code is executed
    } //preload

    fill(0);
    rect(0, 0, width, height);
   
     // Expand and draw circles
    noStroke();
    fill(255);
    for (let i = 0; i < circles_2.length; i++) {
        circles_2[i].expand();
        circles_2[i].draw();
    }

    if(cur_frac>0.95){
        circles_2 = [];
        setupComplete = false;
    }

     // Remove circles that are fully expanded
     for (let i = circles_2.length - 1; i >= 0; i--) {
        if (circles_2[i].isFullyExpanded()) {
            circles_2.splice(i, 1);
        }
    }

    let minPopSize = 0;

     // Check if all circles are not yet removed
     if (circles_2.length > 0) {
        // Calculate the fraction of circles to remove based on current fraction
        let fractionToRemove = map(cur_frac, 0, 0.95, 0, 0.3);

        // Calculate the number of circles to remove in this frame
        let circlesToRemove = Math.ceil(fractionToRemove * circles_2.length);

        // Remove circles gradually
        for (let i = 0; i < circlesToRemove; i++) {
            // Randomly select a circle index to remove
            let randomIndex = Math.floor(Math.random() * circles_2.length);
            // Check if the circle's diameter exceeds a certain threshold before removing it
            if (circles_2[randomIndex].diameter >= minPopSize) {
                // Remove the circle at the random index
                circles_2.splice(randomIndex, 1);
            }
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
        this.diameter += this.expansionRate * 1.2;
    }

    // Function to check if the circle is fully expanded
    isFullyExpanded() {
        return this.diameter >=  width/2  ;//max(width, height);
    }

    // Function to draw the circle
    draw() {
        // Define the number of color segments for the rainbow effect
        let numSegments = 72; // Adjust the number of segments as needed

        // Calculate the angle increment for each segment
        let angleIncrement = TWO_PI / numSegments;

        // Draw the main white circle
        fill(255);
        ellipse(this.x, this.y, this.diameter);

        // Loop through each segment and draw the corresponding part of the rim
        for (let i = 0; i < numSegments; i++) {
            // Calculate the start and end angles of the current segment
            let startAngle = i * angleIncrement;
            let endAngle = (i + 1) * angleIncrement;

            // Calculate the corresponding color for the current segment
            let hue = map(i, 0, numSegments, 0, 360); // Map the segment index to a hue value (0-360)
            let segmentColor = color('hsb(' + hue + ', 100%, 100%)'); // Create a color using HSB color mode

            // Set the fill color for the current segment
            fill(segmentColor);

            // Calculate the radius for the current segment
            let outerRadius = this.diameter / 2;
            let innerRadius = outerRadius - 10; // Adjust the width of the rainbow rim as needed

            // Draw the segment of the rainbow rim
            beginShape();
            vertex(this.x + cos(startAngle) * innerRadius, this.y + sin(startAngle) * innerRadius);
            vertex(this.x + cos(startAngle) * outerRadius, this.y + sin(startAngle) * outerRadius);
            vertex(this.x + cos(endAngle) * outerRadius, this.y + sin(endAngle) * outerRadius);
            vertex(this.x + cos(endAngle) * innerRadius, this.y + sin(endAngle) * innerRadius);
            endShape(CLOSE);
        }
    }
}