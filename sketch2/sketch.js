let girlImg;
let splatterImg;

let bubbleSize = 0;
let maxBubble = 300;

let bubbleX = 250;
let bubbleY = 280;

let finished = false;

function preload() {
  girlImg = loadImage("p5GIRL.png");
  splatterImg = loadImage("p5SPLATTER.png");
}

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (finished) {
    showFinalScreen();
    return;
  }

  background(255);
  image(girlImg, 0, 0, width, height);

  drawBubble();
}

function drawBubble() {
  if (mouseIsPressed && bubbleSize < maxBubble) {
    bubbleSize += 0.8; 
  }

  fill(255, 105, 180, 200);
  stroke(225, 80, 180, 250);
  ellipse(bubbleX, bubbleY, bubbleSize);

  if (bubbleSize >= maxBubble) {
    finished = true;
  }
}

function showFinalScreen() {
  image(splatterImg, 0, 0, width, height)

  fill(0, 150, 150);
  textSize(64);
  text("blow.", width / 2, height / 2);
  
}