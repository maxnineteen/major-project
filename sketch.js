// Artermis
// Maxine Zeng
// Date

let characterSzie =  45;
let characterPos;
let originalPos;
let characterImg;
let ground;
//objects = ground - height

function preload(){
  characterImg = loadImage("assets/ranger archer/run_0.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ground = height/4*3;
  characterPos = {x: width/2, y: ground - characterSzie, speed: 5, jumpheight : height/10};
  // let theCharacter = new Movement();
}

function draw() {
  background(255);
  WASDControls();
  fill("green");
  rect(width/3*2, height/2, width/10, height/30);
  image(characterImg, characterPos.x, characterPos.y, characterSzie, characterSzie);
}

// function keyPressed(){
//   let jumpProcess = 0;
//   if (keyCode === 32){
//     while (jumpProcess <= characterPos.jumpheight){
//       characterPos.y -= characterPos.speed;
//     }
//   }
// }
// function keyReleased(){
//   if (keyCode === 32){
//     characterPos.y += characterPos.speed;
//   }
// }

function WASDControls(){
  if (keyIsDown(87)) {  // w
    characterPos.y -= characterPos.speed;
  }
  if (keyIsDown(83)) {  //s
    characterPos.y += characterPos.speed;  
  }
  if (keyIsDown(65)) {  //a
    characterPos.x -= characterPos.speed;  
  }
  if (keyIsDown(68)) {  //d
    characterPos.x += characterPos.speed;  
  }
  if (characterPos.y >= ground - characterSzie){
    characterPos.y = ground - characterSzie;
  }
  if (characterPos.y <= ground - characterSzie - characterPos.jumpheight){
    characterPos.y = ground - characterSzie - characterPos.jumpheight;
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

