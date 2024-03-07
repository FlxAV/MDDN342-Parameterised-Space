[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/DlFCTo_q)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14049575&assignment_repo_type=AssignmentRepo)
### 2024 MDDN342 Project 1: Parameterised Space

**************PART 1**************


This design is inspired by the game snake. I want the scene to start empty and then slowly fill up with lines (snakes) going around the space and filling it up.

In terms of concrete performance, I'd like to have different depths, so some lines are "closer" to the screen and others are more pushed back in the background, so varying shapes as well. If possible I may look into making the animation appear 3D so the snake is coming towards the screen and vice versa.

An inspiration that has been brought to my attention is the 3D pipes screensaver, which looks similar to what I had in mind.

In terms of color, I'm not set one style in particular. Maybe lots of colors with big contrast or just plain colors with a gradient from dark to light.

![Reference!](MDDN342_pipes02.jpg)
 

**************PART 2**************

So I got to a point where I had a grid on my canvas and was able to generate a line that travels across my screen and then the "tail" would travel off the screen making it appear as though the line was travelling accross the canvas like a snake.

However, I have realised that with the 24 frame time frame I dont believe I would be able to make a snake crawl around the screen in a random path and then remove itself from the screen within the timeframe in a way that looks good.

Therefoore I am now looking into doing something ideally somewhat related to my idea or maybe go completely in a different direction.