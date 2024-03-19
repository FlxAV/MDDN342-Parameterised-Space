[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/DlFCTo_q)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14049575&assignment_repo_type=AssignmentRepo)
### 2024 MDDN342 Project 1: Parameterised Space

**************PART 1**************


This design is inspired by the game snake. I want the scene to start empty and then slowly fill up with lines (snakes) going around the space and filling it up.

In terms of concrete performance, I'd like to have different depths, so some lines are "closer" to the screen and others are more pushed back in the background, so varying shapes as well. If possible I may look into making the animation appear 3D so the snake is coming towards the screen and vice versa.

An inspiration that has been brought to my attention is the 3D pipes screensaver, which looks similar to what I had in mind.

In terms of color, I'm not set one style in particular. Maybe lots of colors with big contrast or just plain colors with a gradient from dark to light.

![Reference!](MDDN342_pipes02.jpg)
 

**************PART 2*****************

So I got to a point where I had a grid on my canvas and was able to generate a line that travels across my screen and then the "tail" would travel off the screen making it appear as though the line was travelling accross the canvas like a snake.

However, I have realised that with the 24 frame time frame I dont believe I would be able to make a snake crawl around the screen in a random path and then remove itself from the screen within the timeframe in a way that looks good.

Therefoore I am now looking into doing something ideally somewhat related to my idea or maybe go completely in a different direction.


***************PART 3******************

Now since I was kinda restarting, I was kind of just trying new things. I created a Class for circles that could be set in a location with a specific radius, so I could make them individually grow at certain paces etc... 

Then I created a "Star" class where it creates a bunch of lines from a specific point and expand from that point to the outside, kind of like an explosion. I then made it so that a bunch would appear in random spots, and then clear the canvas with a circle.
The animation was a bunch of spots on the canvas were randomly slected with a check to make sure two spots weren't too close to each other. Then the "explosion" animation would begin from each point (around 6 points). Each point was a random color, once the explosions had reach the borders of the canvas, a cricle would be drawn from the center of the canvas, expanding and erasing everything, completing the loop.  I found that all of that happening in one second was just too much and chaotic so I wasn't too thrilled.

After that I moved onto creating a new draw_one_frame file so that I could keep the "Stars" one and work on something else. I know generate a grid of circles across the canvas. I then assign noise values to each point and thecircles expand using such Noise function until it covers teh whole screen. The circles then diminish and then repeat. The loop completes when the screen is completely covered.