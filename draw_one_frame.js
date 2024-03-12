// function draw_one_frame(cur_frac) {
//     // Background
//     fill(255); // White background
//     rect(0, 0, width, height);

//     //console.log(cur_frac);


// }




//********************* STARS ******************************************** */

// Function to add a new exploding star to the array
function addStar() {
    let minDistance = 100; // Minimum distance between stars

    // Generate a new star with random position and color
    let x = random(width); // Random x-coordinate for the star
    let y = random(height); // Random y-coordinate for the star
    let c = color(random(255), random(255), random(255)); // Random color for the star
    let newStar = new ExplodingStar(x, y, c); // Create a new exploding star

    // Check the distance between the new star and all existing stars
    let tooClose = false;
    for (let i = 0; i < stars.length; i++) {
        let d = dist(newStar.x, newStar.y, stars[i].x, stars[i].y);
        if (d < minDistance) {
            tooClose = true;
            break; // Stop checking if one star is too close
        }
    }

    // Add the new star if it's not too close to any existing star
    if (!tooClose) {
        stars.push(newStar); // Add the star to the array
    }
}

// Define the angle step for each line
let angleStep = Math.PI / 6; // You can adjust this value to control the density of the lines
let lineThickness = 30; // Initial line thickness
let numExplosions = 6;
let timeOfExplosion = 2;

class ExplodingStar {
    constructor(x, y, color) {
        this.x = x; // X-coordinate of the star center
        this.y = y; // Y-coordinate of the star center
        this.color = color; // Color of the star
    }

    // Method to draw the exploding star
    draw(cur_frac) {
        for (let angle = 0; angle < TWO_PI; angle += angleStep) {
            // Calculate the end point of each line
            let x2 = this.x + cos(angle) * cur_frac * timeOfExplosion * width / 1;
            let y2 = this.y + sin(angle) * cur_frac * timeOfExplosion * height / 1;

            // Draw the line from the center to the calculated end point
            strokeWeight(lineThickness); // Set the line thickness
            stroke(this.color); // Set the stroke color
            line(this.x, this.y, x2, y2);
        }
    }
}

//***************CIRCLES *************************************** */

// Function to add a new circle to the array
function addCircle() {
    let c_color = 0;
        if(color_switch){
            c_color = 255;
            color_switch = false;
        }else{
            c_color = 0;
            color_switch = true;
        }
    let newCircle = new Circle(width / 2, height / 2, 0, c_color ); // Create a new circle at the center
    circles.push(newCircle); // Add the circle to the array
    }
    
    // Circle object definition
    class Circle {
    constructor(x, y, radius, color) {
        this.x = x; // X-coordinate of the circle center
        this.y = y; // Y-coordinate of the circle center
        this.radius = radius; // Current radius of the circle
        this.growing = true; // Flag to indicate if the circle is expanding or shrinking
        this.color = color;
    }
    
    // Update the properties of the circle
    update(cur_frac) {
        if (this.growing) {
            this.radius += 50 ; // Increase the radius to make the circle expand
            
        }
    
        // Check if the circle has reached the maximum size
        if (this.radius > Math.min(width, height)) {
            this.growing = false; // Stop the circle from expanding
        }
    }
    
    // Draw the circle
    display() {
        fill(this.color); // Draw without fill
        noStroke(); // Black stroke color
        ellipse(this.x, this.y, this.radius * 2); // Draw the circle
    }
    }

//******************************* MAIN ********************************* */

let added = true;

function draw_one_frame(cur_frac) {
    
    let back_color = 0;
    if(color_switch){
        back_color = 0;
    }if(!color_switch ){
        back_color = 255;
    }
    fill(back_color); // White background
    rect(0, 0, width, height);

    // Check if a new star needs to be added
    if (stars.length < numExplosions) {
        for(let i = 0; i<numExplosions; i++){
            addStar(); // Add a new exploding star if conditions are met
        }
    }

    // Draw all exploding stars
    for (let i = 0; i < stars.length; i++) {
        stars[i].draw(cur_frac);
    }

   //Reseting the array of the Stars
    if(cur_frac == 0){
        stars = [];
        circles = [];
        added = true;
    }


    

    // Check if a new circle needs to be added
    if (cur_frac >= 0.5 && added ) {
        addCircle(); // Add a new circle if conditions are met
        added = false;
    }

    // Update and draw all circles
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        circle.update(cur_frac); // Update circle properties
        circle.display(); // Draw the circle
    }
}







