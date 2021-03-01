// Sasha's hunt
// Maxine Zeng
// 2021.03.01

//UI variables
let heart;
let question;
let instruction = {isAlive: false};
let instructionButton;
let pixleFont;

//display character and movement
let charactersize =  45;
let character;
let characterLife = 3;

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
let leftDead;
let rightDead;
let jumpState = false;
let count = 0;

//map and display variables
let emptyArray;
let ground;
let bk;
let platform;
let platform1;
let gravity = 0.5;

//monster display variables
let rightSlime;
let leftSlime; 
let slime;
let slimeImg;
let meat;
let meatNumber = 0;
let meatAlive = false;

//sound affect variables
let bgm;
let bgmAlive = true;
let award;

function preload(){
  // loading UI image
  heart = loadImage("assets/heart.png");
  question = loadImage("assets/question mark.png");
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
  leftDead = loadImage("assets/ranger archer/left dead.png");
  rightDead = loadImage("assets/ranger archer/right dead.png");
  
  //loading monster image
  rightSlime = loadImage("assets/ranger archer/slime/right slime.gif");
  leftSlime = loadImage("assets/ranger archer/slime/left slime.gif");
  slimeImg = rightSlime;
  meat = loadImage("assets/meat.png");

  //loading map image
  bk = loadImage("assets/backgroud.jpg");

  //loading sound affects
  award = loadSound("assets/award.mp3");
  bgm = loadSound("assets/Sweet Saturn - Dennis Kuo.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgm.setVolume(0.1);
  award.setVolume(0.1);
  bgm.play();

  ground = height/4*3-5;
  platform = {w:width/10, h:height/35};
  platform1 = {x:width/3*2 ,y: height/5*3, w: platform.w, h: platform.h};

  character = {x: width/2, y: ground, dx: 0, dy: 0, ax: 0, ay: 0, speed: 4};
  characterImg = rightIdle; 

  slime = {x: width/3*2,  y: ground + 20, width: 40, height: 25, dx: 1, dy: 1, isAlive: 1}; 
}

function draw() {
  background(bk);
  
  //UI displaying
  displayLife();
  instructions();
  displayMeat();

  //character and monster displaying
  walking(); 
  jumping();
  collidCheck();
  displayCharacter();
  displaySlime();
  
} 

//UI functions
//Display eat icon & number
function displayMeat(){
  image(meat, 10, 40, 36/2, 43/2);
  textAlign(LEFT, TOP);
  textSize(10);
  textFont(pixleFont);
  fill("black");
  text("x " + meatNumber, 30, 50, 36/2, 43/2);
}

//Display heart icon & number
function displayLife(){
  for (let i=0; i<characterLife; i++){
    image(heart, 10 + i*30, 10, 20, 20);
  }
  
  if (characterLife === 0){
    bk.filter(GRAY);   
    textAlign(CENTER, CENTER);
    textSize(30);
    textFont(pixleFont);
    fill("white");
    text("You are too tired to hunt today.", width/2, height/2);
  }
  
  if (meatNumber === 1){ 
    textAlign(CENTER, CENTER);
    textSize(30);
    textFont(pixleFont);
    fill("white");
    text("Now you have enough meat to go home.", width/2, height/2);
    textSize(10);
    textFont("Helvetica");
    text("To be continue...", width/2 , height/2 + 20);
  }
}

//Display instructions
function instructions(){
  // instruction.isAlive = true;
  image(question, width - 30, 10, 20, 20);
  let hit = collidePointRect(mouseX, mouseY,width - 30, 10, 20, 20);
  if (hit){
    instruction.isAlive = true;
  }
  else{
    instruction.isAlive = false;
  }

  if (instruction.isAlive){
    textAlign(LEFT, TOP);
    textSize(13);
    fill("#EAC381");
    rect(width-200, 30, 170, 150);
    fill("#1D1912");
    textFont(pixleFont);
    text("Use 'a', 'd', to move left or right and space to jump. ", width-190, 40, 150, 100);
    text("Use 'k' to attack. ", width-190, 100, 170, 200);
    text("If you are tired, hit refresh to start over.", width-190, 130, 150, 100);
  }
}

//Character and monster funtions
//Show character
function displayCharacter(){
  if (characterImg === rightCloseAttack){
    image(characterImg, character.x, character.y, 63, charactersize);
  }
  else if (characterImg === leftCloseAttack){
    image(characterImg, character.x, character.y, 63, charactersize);
  }
  else if (characterLife === 0){
    if (characterImg === leftIdle || characterImg === leftWalk){
      characterImg = leftDead;
    }
    if (characterImg === rightIdle || characterImg === rightWalk){
      characterImg = rightDead;
    }
    characterImg.filter(GRAY);
    image(characterImg, character.x, character.y, 51, charactersize);
  }
  else{
    image(characterImg, character.x, character.y, charactersize, charactersize);
  }
}

//Show slime
function displaySlime(){
  // slime.isAlive = false;
  if (slime.isAlive === 1){
    slime.x += slime.dx;
    image(slimeImg, slime.x, slime.y, slime.width, slime.height);
  
    if (slime.x >= width/4*3){
      slime.dx *= -1;
      slimeImg = leftSlime;
    }
    else if (slime.x < width/3*2){
      slime.dx *= -1;
      slimeImg = rightSlime;
    }
  }
  else if (slime.isAlive === 2){
    meatAlive = true;
  }
  else if (slime.isAlive === 3){
    meatAlive = false;
  }
  if(meatAlive){
    image(meat, slime.x, slime.y, 36/2, 43/2);
  }  
}

//Check if character and monster hit each others
function collidCheck(){
  let hit = collideRectRect(character.x, character.y, charactersize, charactersize, 
    slime.x, slime.y, slime.width, slime.height);

  if (hit && characterLife > 0){
    if (characterImg === rightCloseAttack || characterImg === leftCloseAttack){
      slime.isAlive = 2;
    }
    if (slime.isAlive === 1){
      if (characterImg === leftIdle || characterImg === rightIdle || characterImg === leftWalk || characterImg === rightWalk){
        characterLife -= 1;
      }
    }
    if (slime.isAlive === 2){
      meatNumber = 1;
      slime.isAlive = 3;
      award.play();
      console.log(slime.isAlive);
    }
  }
}

//4 types of character movements as function titled and corresponding animation changes
function jumping(){
  //acceleration affects velocity
  character.dx += character.ax;
  character.dy += character.ay;

  //velocity affects location
  character.x += character.dx;
  character.y += character.dy;

  //gravity, if needed
  if (character.y < ground) {
    character.dy += gravity;
  }
  
  else {
    character.y = ground;
    character.dy = 0;
    count = 0;
  }

  //remove thrust from jump
  character.ay = 0;
}

function keyPressed(){
  if (characterLife > 0){
    if (keyCode === 32 && count < 2){  //jump
      // character.y -= character.jumpheight;
      jumpState = true;
      jumping();
      character.ay = -10;
      count += 1;
      console.log(count);
      if (characterImg === rightWalk || characterImg === rightIdle){
        characterImg = rightJump; 
      } 
      if (characterImg === leftWalk || characterImg === leftIdle){
        characterImg = leftJump; 
      }
    }
    
    if (keyCode === 68) {  //d left
      // character.x += character.speed;  
      characterImg = rightWalk;
    }
    if (keyCode === 65) {  //a right
      // character.x -= character.speed; 
      characterImg = leftWalk; 
    }
    if (keyCode === 75) {  //k attack
      if (characterImg === leftWalk || characterImg === rightIdle){
        characterImg = rightCloseAttack; 
      } 
      if (characterImg === rightWalk || characterImg === leftIdle){
        characterImg = leftCloseAttack; 
      }     
    }
  }
}

function keyReleased(){
  if (characterLife > 0){
    if (keyCode === 32){
      if (characterImg === rightJump){
        characterImg = rightIdle;
      }
      if (characterImg === leftJump){
        characterImg = leftIdle;
      }
      jumpState = false;
    }       
    if (keyCode === 68) {  //d
      characterImg = rightIdle;
    }
    if (keyCode === 65) {  //a
      characterImg = leftIdle; 
    }
    if (keyCode === 75) {  //k
      if (characterImg === rightCloseAttack){
        characterImg = rightIdle; 
      }
      if (characterImg === leftCloseAttack){
        characterImg = leftIdle; 
      }
    }
  }
}

function walking(){ 
  if (characterLife > 0){
    if (keyIsDown(68)) {  //d left
      character.x += character.speed;  
      if (jumpState === false){
        characterImg = rightWalk;     
      }
    }
    if (keyIsDown(65)) {  //a right
      character.x -= character.speed; 
      if (jumpState === false){
        characterImg = leftWalk; 
      }     
    }
  }
}