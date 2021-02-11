// Artermis
// Maxine Zeng
// Date

let characterValue = {dx : 45, dy: 45};
let characterImg;
let ground;
//objects = ground - height

function preload(){
  characterImg = loadImage("assets/ranger archer/run_0.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ground = height/4*3;
  // let theCharacter = new Movement();
}

function draw() {
  background(255);
  WASDControls;
  image(characterImg, width/2, ground - characterValue.dy, characterValue.dx, characterValue.dy);
}

function WASDControls(){
  if (keyIsDown(87)) {  // w
    this.y -= this.speed;  
  }
  if (keyIsDown(83)) {  //s
    this.y += this.speed;  
  }
  if (keyIsDown(65)) {  //a
    this.x -= this.speed;  
  }
  if (keyIsDown(68)) {  //d
    this.x += this.speed;  
  }
}

class Attack {
  constructor(x, y, dx, dy, speed) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;
  }

  move (){
    
  }
}

