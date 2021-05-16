// global variables for sprites

var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var monkey , monkey_running;    
var banana ,bananaImage, obstacle, obstacleImage,groundImage;
var FoodGroup, obstacleGroup;  
var score = 0;
var SurvivalTime = 0;


function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgimg = loadImage("forest.jpg")
 
}



function setup() {
  
  createCanvas(400,400);
  
  //creating a sprite for monkey.
  monkey = createSprite(65,330,50,40);
  //adding animation to the monkey.
  monkey.addAnimation("monkeyrunning",monkey_running);
  monkey.scale = 0.1;
  
  //crating a sprite for ground.
  ground = createSprite(400,350,900,10);
  // dividing the ground into two.
  ground.x = ground.width /2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  SurvivalTime = 0;
  score = 0;
}




function draw() {
  
  // giving background colour as lightblue.
  background(bgimg);
  
  textSize(20)
  fill("red")
  text("SurvivalTime: "+ score, 200,50);

  if (score  === 1000){
     console.log("you win")
  }
  
  if (gamestate === PLAY ){
    
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(7 + 3*score/100);
    
    if (monkey.isTouching(FoodGroup)){
        
      banana.lifetime = 0;
      
        
        }
    
    //jump when the space key is pressed.
    if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -18;
    }
    //add gravity.
    monkey.velocityY = monkey.velocityY + 0.8;
  
    // giving velocity to the ground.
  ground.velocityX = -10;
  
  // reseting the ground.
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     
    
    if (monkey.isTouching(obstacleGroup)){
        gamestate = END;
        }
    
      }
  else if (gamestate === END){
           
      monkey.velocityX = 0;
      ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    textSize(30)
    text("GAME OVER!", 118,185)
  
     //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
       
   }
  
  // monkey collide with ground. 
  monkey.collide (ground);
  
  //text(mouseX + ","+ mouseY,mouseX,mouseY);

  food();
  obstacles();
  
  drawSprites();
}

function food() {

  if(frameCount % 80 === 0 ){
     banana = createSprite(450,130,10,30);
     banana.y = Math.round (random (120,200))
     banana.addImage("banana",bananaImage );
     banana.scale = 0.1;
     banana.velocityX = -3;
    
    banana.lifetime = 130;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    FoodGroup.add(banana);
    
     }               
}

function obstacles() {
  
  if (frameCount % 200=== 0){
    obstacle = createSprite(450,310,40,40);
    obstacle.addImage("obstacle",obstacleImage)
    obstacle.scale = 0.2
    obstacle.velocityX = -3
    
    obstacle.lifetime = 130
    
    obstacleGroup.add(obstacle);
    
      }
}
