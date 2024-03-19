function draw_one_frame(cur_frac) {

    if(switch_02){
        fill(0);
    }else{
        fill(255); // White background
    }
    fill(255);
    rect(0, 0, width, height);
   
    
    let num_cols = 18;
    let num_rows = 8;

    // Adjust cur_frac to ensure seamless looping
    cur_frac = (cur_frac + 0.005) % 1; // Adjust the offset as needed

    

    
    // Generate Perlin noise values for each circle
    

    noiseSeed(210); // Set a consistent noise seed for reproducibility
     
    let noiseScale = 0.4;
    let noiseValues = [];
    for (let i = 0; i < num_cols; i++) {
        noiseValues[i] = [];
        for (let j = 0; j < num_rows; j++) {
            noiseValues[i][j] = noise(i * noiseScale, j * noiseScale, cur_frac);
        }
    }

    // Draw circles with smoothly oscillating sizes
    noStroke();
    for (let i = 0; i < num_cols; i++) {
        for (let j = 0; j < num_rows; j++) {
            let x = (i + 0) * (width / (num_cols -1));
            let y = (j + 0) * (height / (num_rows -1));

            let value_a = 1.5;
            let value_b = 2.2;

            // Smoothly oscillate the size based on noise
            let diameter = map(sin(TWO_PI * cur_frac + noiseValues[i][j] * TWO_PI), -1, 1, 10, min(width * value_a / (num_cols + 1), height * value_b / (num_rows + 1)) * 4);
            
            if(switch_02){
                fill(0);
            }else{
                fill(255); // Black color
            }
            fill(0);
            ellipse(x, y, diameter);
        }
    }


    if(cur_frac > 0.95){
        switch_02 = !switch_02;
    }


}