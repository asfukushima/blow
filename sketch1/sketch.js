let letters = [];
let isMoving = false;
let img1, img2;
let angle = 0;
let spinning = false;
let spinSpeed = 0.05;

let img1X = 150;
let img1Y = 350;
let img1W = 300;
let img1H = 250;


let img2X = 87;
let img2Y = 310;
let img2W = 250;
let img2H = 250;


function preload() {
  img1 = loadImage('p5blades-02.png');
  img2 = loadImage('p5blades2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(64);
  imageMode(CENTER);

  let word = ["b", "l", "o", "w", "."];
  let spacing = 60;
  let startX = width / 2 - (word.length - 1) * spacing / 2;
  let y = height / 2;
  let color = 'pink';
  for (let i = 0; i < word.length; i++) {
    let x = startX + i * spacing;
    letters.push(new Letter(word[i], x, y));
  }
}

function draw() {
  background('yellow');

  for (let l of letters) {
    if (isMoving) l.update();
    l.display();
  }

  image(img1, img1X, img1Y, img1W, img1H);

  push();
  translate(img2X, img2Y);
    if (spinning) angle += spinSpeed;
    rotate(angle);
    image(img2, 0, 0, img2W, img2H);
  pop();
}

function mousePressed() {
  let halfW = img2W / 2;
  let halfH = img2H / 2;
  if (mouseX > img2X - halfW && mouseX < img2X + halfW &&
      mouseY > img2Y - halfH && mouseY < img2Y + halfH) {
    spinning = !spinning;
    isMoving = spinning;
  }
}

class Letter {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.vx = random(2, 5);
    this.vy = random(-2, 2);
    this.col = color('pink');
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > width - 20) {
      this.x = width - 20;
      this.vx = 0;
    }
    if (this.y < 20 || this.y > height - 20) {
      this.vy *= random(5,10);
    }
  }

  display() {
    fill(this.col);
    noStroke();
    text(this.char, this.x, this.y);
  }
}
