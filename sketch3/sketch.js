let shapes = []; // an array that will hold our shapes
let poem = ["don't", "listen", "to", "them", "they", "are", "opressing", "you"];
let numberOfShapes = 100; // how many words to draw
let mouseThreshold = 50; // how close can your mouse get to a shape before it moves
let moveDistance = 150; // how far shapes move away from your mouse
let animateDistance = 50; // how much each shape animates 

// create a "shape" class that holds all information about each shape
class Shape {
  constructor() {
    this.x = random(0, windowWidth); // each shape has a random x position
    this.y = random(0, windowHeight); // and a random y position
    this.radius = random(5, 25); // give each shape a random size between two values
    this.color = color(random(0, 255), random(0, 255), random(0, 255)); // and a random color
    this.word = random(poem); // each one has a random word from the poem array
  }

  // create a function that moves a shape away from your mouse
  updateShape() {
    let mouseDistance = int(dist(this.x, this.y, mouseX, mouseY)); // check the distance from your mouse to the shape
    if (mouseDistance <= mouseThreshold) { // if your mouse gets closer than the threshold...
      this.x += random(-moveDistance, moveDistance); // give the shape a new x position
      this.y += random(-moveDistance, moveDistance); // and a new y position
    }
  }
  
  // create a function to animate each shape
  animateShape(){
    this.x = lerp(this.x, random(this.x - animateDistance, this.x + animateDistance), 0.01);
    this.y = lerp(this.y, random(this.y - animateDistance, this.y + animateDistance), 0.01);
  }

  // create a function to draw each shape
  drawShape() {
    fill(this.color);
    textAlign(CENTER);
    textSize(this.radius);
    text(this.word, this.x, this.y);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight); // create a canvas that fills the whole screen
  
  // create a bunch of shape objects
  for (let i = 0; i < numberOfShapes; i++) {
    shapes.push(new Shape());
  }
}

function draw() {
  background(244);

  // update shape positions based off of the mouse location
  // and draw them to the screen
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].updateShape();
    shapes[i].animateShape();
    shapes[i].drawShape();
  }
  
  // draw ellipse that follows mouse
  ellipse(mouseX, mouseY, 50, 50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}