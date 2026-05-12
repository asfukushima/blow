//grenade image
let grenadeX = 450; 
let grenadeY = 300;
let grenadeSize = 800;

//explosions images
let spawnRate = 4;       
let explosionSize = 200; 
let coverGoal = 80;      

let firstFrame, finalFrame, grenadeImg;
let explosionImgs = []; // a list holding all 5 explosion images

//exploding  actionscreen
let state = "explosion";
let explosions = []; 
let coveredCount = 0;  


function preload() {
  firstFrame = loadImage("FIRSTFRAME.png");
  finalFrame = loadImage("FINALFRAME.png");
  grenadeImg = loadImage("GRENADE.png");

  explosionImgs.push(loadImage("EXPLOSION1.png"));
  explosionImgs.push(loadImage("EXPLOSION2.png"));
  explosionImgs.push(loadImage("EXPLOSION3.png"));
  explosionImgs.push(loadImage("EXPLOSION4.png"));
  explosionImgs.push(loadImage("EXPLOSION5.png"));
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER); 
  noStroke();
}


function draw() {
  background(0);

  if (state === "explosion") {
    showIdleScreen();
  } else if (state === "exploding") {
    showExplosionScreen();
  } else if (state === "final") {
    showFinalScreen();
  }
}


function showIdleScreen() {
  image(firstFrame, width / 2, height / 2, width, height);

  //cursor change hover
  if (isMouseOnGrenade()) {
    cursor("pointer");
  } else {
    cursor(ARROW);
  }

  //grenade image
  image(grenadeImg, grenadeX, grenadeY, grenadeSize, grenadeSize);
}


function showExplosionScreen() {
  image(firstFrame, width / 2, height / 2, width, height);

  //explosions spawn
  if (coveredCount < coverGoal) {
    
    if (frameCount % 10 === 0) {
      for (let i = 0; i < spawnRate; i++) {
      addExplosion();
    }

  }
}

  for (let e of explosions) {
    image(e.img, e.x, e.y, e.size, e.size);
  }

  if (coveredCount >= coverGoal) {
    state = "final";
  }
}


function showFinalScreen() {
  image(finalFrame, width / 2, height / 2, width, height);
}


function addExplosion() {
  let randomImg = random(explosionImgs); 
  let randomX   = random(0, width);      
  let randomY   = random(0, height);     

  explosions.push({
    img:  randomImg,
    x:    randomX,
    y:    randomY,
    size: explosionSize
  });

  coveredCount++; 
}


function mousePressed() {
  if (state === "explosion" && isMouseOnGrenade()) {
    state        = "exploding";
    explosions   = []; 
    coveredCount = 0;  
  }
}


function isMouseOnGrenade() {
  let halfSize = grenadeSize / 2;
  return (
    mouseX > grenadeX - halfSize &&
    mouseX < grenadeX + halfSize &&
    mouseY > grenadeY - halfSize &&
    mouseY < grenadeY + halfSize
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
