// Artermis
// Maxine Zeng
// Date

let characterSzie =  45;
let characterPos;
let originalPos;
let characterImg;
let leftWalk;

let ground;
let jumpPad;
//objects = ground - height

function preload(){
  leftWalk = loadImage("assets/ranger archer/run/right run.gif");
  rightWalk = loadImage("assets/ranger archer/run/left run.gif");
  leftIdle = loadImage("assets/ranger archer/idle/left idle_0.png");
  rightIdle = loadImage("assets/ranger archer/idle/rigth idle_0.png");
  rightCloseAttack = loadImage("assets/ranger archer/attack/right close attack.png");
  leftCloseAttack = loadImage("assets/ranger archer/attack/left close attack.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ground = height/4*3;
  jumpPad = {w:width/10, h:height/35};
  characterPos = {x: width/2, y: ground - characterSzie, speed: 5, jumpheight : height/10};
  originalPos = characterPos.y;
  characterImg = rightIdle;
  console.log(originalPos);
}

function draw() {
  background(255);
  WASDControls();       
  fill("green");
  rect(width/3*2, height/3*2, width/10, height/35);
  if (characterImg === rightCloseAttack){
    image(characterImg, characterPos.x+9, characterPos.y, 63, characterSzie);
  }
  else if (characterImg === leftCloseAttack){
    image(characterImg, characterPos.x-24, characterPos.y, 63, characterSzie);
  }
  else{
    image(characterImg, characterPos.x, characterPos.y, characterSzie, characterSzie);
  }
}

function keyPressed(){
  if (keyCode === 32){  //jump
      characterPos.y -= characterPos.jumpheight;
    }
  if (keyCode === 68) {  //d left
    characterPos.x += characterPos.speed;  
    characterImg = leftWalk;
  }
  if (keyCode === 65) {  //a right
    characterPos.x -= characterPos.speed; 
    characterImg = rightWalk; 
  }
  if (keyCode === 75) {  //k
    if (characterImg === rightWalk || characterImg === rightIdle){
      characterImg = rightCloseAttack; 
    } 
    if (characterImg === leftWalk || characterImg === leftIdle){
      characterImg = leftCloseAttack; 
    }     
  }
}
function keyReleased(){
  if (keyCode === 32){
    characterPos.y += characterPos.jumpheight;
  }
  if (keyCode === 68) {  //d
    characterImg = rightIdle;
  }
  if (keyCode === 65) {  //a
    characterImg = leftIdle; 
  }
  if (keyCode === 75) {  //a
    if (characterImg === rightCloseAttack)
      characterImg = rightIdle; 
  }
    if (characterImg === leftCloseAttack)
      characterImg = leftIdle; 
}


function WASDControls(){ 
  if (keyIsDown(68)) {  //d
    characterPos.x += characterPos.speed;  
    characterImg = leftWalk;
  }
  if (keyIsDown(65)) {  //a
    characterPos.x -= characterPos.speed; 
    characterImg = rightWalk; 
  }
  if (characterPos.y >= ground - characterSzie){
    characterPos.y = ground - characterSzie;
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

