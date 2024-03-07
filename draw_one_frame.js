function draw_one_frame(cur_frac) {
    // Background
    fill(255); // White background
    rect(0, 0, width, height);

    //console.log(cur_frac);

 // Update and draw all circles
 for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    circle.update(cur_frac); // Update circle properties
    circle.display(); // Draw the circle
}

// Check if a new circle needs to be added
if (circles.length < 1 || circles[circles.length - 1].radius >= Math.min(width, height) / 8) {
    addCircle(); // Add a new circle if conditions are met
}
}

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
        this.radius += 10 ; // Increase the radius to make the circle expand
        
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