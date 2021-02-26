// Sasha's hunt
// Maxine Zeng
// Date

//UI variables
let heart;
let question;
let bk;
let instruction = {isAlive: false};
let instructionButton;

//display character and movement
let characterSzie =  45;
let characterPos;

//animation display variables
let characterImg;
let rightWalk;
let leftWalk;
let leftIdle;
let rightIdle;
let rightCloseAttack;
let leftCloseAttack;
let rightJump;
let leftJump;

//map display variables
let emptyArray;
let ground;
let jumpPad;
//objects = ground - height

function preload(){
  // loading UI image
  heart = loadImage("assets/heart.png");
  question = loadImage("assets/question mark.png");
  bk = loadImage("assets/backgroud.jpg");
  pixleFont = loadFont("assets/subway-ticker/SUBWT___.ttf"); 

  //loading main character animation
  rightWalk = loadImage("assets/ranger archer/run/right run.gif");
  leftWalk = loadImage("assets/ranger archer/run/left run.gif");
  leftIdle = loadImage("assets/ranger archer/idle/left idle_0.png");
  rightIdle = loadImage("assets/ranger archer/idle/rigth idle_0.png");
  rightCloseAttack = loadImage("assets/ranger archer/attack/right close attack.png");
  leftCloseAttack = loadImage("assets/ranger archer/attack/left close attack.png");
  rightJump = loadImage("assets/ranger archer/jump/right jump_0.png");
  leftJump = loadImage("assets/ranger archer/jump/left jump_0.png");
  
  //loading map image

  //loading sound affects

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ground = height/4*3-5;
  jumpPad = {w:width/10, h:height/35};

  characterPos = {x: width/2, y: ground - characterSzie, dx: 0, dy: 0, 
                  ax: 0, ay: 0, speed: 4,};
  characterImg = rightIdle; 

  instructionButton = new Clickable();
  instructionButton.locate(width - 30, 10);
  instructionButton.resize(20,20);
  instructionButton.text = " ";
  instructionButton.strokeWeight = 0;
  instructionButton.onHover = function(){
    instruction.isAlive = true;
  }
  instructionButton.onOutside = function(){
    instruction.isAlive = false;
  }
}

function draw() {
  background(bk);
        
  fill("green");
  strokeWeight(2.5);
  rect(width/3*2, height/3*2, width/10, height/35);
  
  for (let i=0; i<3; i++){
    image(heart, 10 + i*30, 10, 20, 20);
  }
  instructionButton.draw();
  image(question, width - 30, 10, 20, 20);
  instructions();
  

  //character displaying
  walking(); 
  jumping();
  displayCharacter();
} 

function instructions(){
  // instruction.isAlive = true;
  if (instruction.isAlive){
    fill("#EAC381");
    rect(width-200, 30, 170, 100);
    fill("#1D1912");
    textFont(pixleFont);
    text("Use 'a', 'd', to move left or right and space to jump. ", width-190, 40, width-450, 200);
    text("Use 'k' to attack. ", width-190, 100, width-450, 200);
  }
}

function displayCharacter(){
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

function jumping(){
  //acceleration affects velocity
  characterPos.dx += characterPos.ax;
  characterPos.dy += characterPos.ay;

  //velocity affects location
  characterPos.x += characterPos.dx;
  characterPos.y += characterPos.dy;

  //gravity, if needed
  if (characterPos.y <= ground) {
    characterPos.dy += 0.5;
  }
  
  // if (characterPos.y <= 500){
  //   characterPos.ay += 0.5;
  // } 

  else {
    characterPos.y = ground;
    characterPos.dy = 0;
  }
//rect(width/3*2, height/3*2, width/10, height/35);
// windowHeight/3*2 + windowHeight/35

  //remove thrust from jump
  characterPos.ay = 0;
}

//movement controls and animation swtiching
function keyPressed(){
  if (keyCode === 32){  //jump
    // characterPos.y -= characterPos.jumpheight;
    characterPos.ay = -12;
    if (characterImg === rightWalk || characterImg === rightIdle){
      characterImg = rightJump; 
    } 
    if (characterImg === leftWalk || characterImg === leftIdle){
      characterImg = leftJump; 
    }
  }
  
  if (keyCode === 68) {  //d left
    // characterPos.x += characterPos.speed;  
    characterImg = rightWalk;
  }
  if (keyCode === 65) {  //a right
    // characterPos.x -= characterPos.speed; 
    characterImg = leftWalk; 
  }
  if (keyCode === 75) {  //k
    if (characterImg === leftWalk || characterImg === rightIdle){
      characterImg = rightCloseAttack; 
    } 
    if (characterImg === rightWalk || characterImg === leftIdle){
      characterImg = leftCloseAttack; 
    }     
  }
}

function keyReleased(){
  if (keyCode === 32){
    if (characterImg === rightJump){
      characterImg = rightIdle;
    }
    if (characterImg === leftJump){
      characterImg = leftIdle;
    }
  }       
  if (keyCode === 68) {  //d
    characterImg = rightIdle;
  }
  if (keyCode === 65) {  //a
    characterImg = leftIdle; 
  }
  if (keyCode === 75) {  //a
    if (characterImg === rightCloseAttack){
      characterImg = rightIdle; 
    }
    if (characterImg === leftCloseAttack){
      characterImg = leftIdle; 
    }
  }
}

//other movement & coliding checking
function walking(){ 
  if (keyIsDown(68)) {  //d left
    characterPos.x += characterPos.speed;  
    if (characterImg === leftJump){
      characterImg = leftJump;
    }
    else{
      characterImg = rightWalk;     
    }
  }
  if (keyIsDown(65)) {  //a right
    characterPos.x -= characterPos.speed; 
    if (characterImg === rightJump){
      characterImg = rightJump;
    }
    characterImg = leftWalk; 
  }
}