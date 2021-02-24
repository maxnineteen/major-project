// Sasha's hunt
// Maxine Zeng
// Date

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

  ground = height/4*3;
  jumpPad = {w:width/10, h:height/35};

  characterPos = {x: width/2, y: ground - characterSzie, dx: 0, dy: 0, 
                  ax: 0, ay: 0, speed: 4,};
  characterImg = rightIdle;
}

function draw() {
  background(255);
  colidCheck();       
  fill("green");
  noStroke();
  rect(width/3*2, height/3*2, width/10, height/35);

  jumping();
  displayCharacter();
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
  if (characterPos.y < ground) {
    characterPos.dy += 0.5;
  }
  else {
    characterPos.y = ground;
    characterPos.dy = 0;
  }

  //remove thrust from jump
  characterPos.ay = 0;
}

//movement controls and animation swtiching
function keyPressed(){
  if (keyCode === 32){  //jump
    // characterPos.y -= characterPos.jumpheight;
    characterPos.ay = -10;
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
function colidCheck(){ 
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
  // if (characterPos.y >= ground - characterSzie){
  //   characterPos.y = ground - characterSzie;
  // }
}

          
// function createEmptyCanvas(cols, rows){
//   emptyArray = [];
//   for (let y=0; y<rows; y++){
//     emptyArray.push([]);
//     for (let x=0; x<cols; x++){
//       emptyArray[y].push(0);
//     }
//   }
//   return emptyArray;
// }

// function displayMap(rows,cols){
//   for (let y=0; y<rows; y++){
//     for (let x=0; x<cols; x++){
//       if 
//     }
//   }
// }

