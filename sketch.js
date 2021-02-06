var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var oppPinkimg1,oppPinkimg2,oppYellowimg1,oppYellowimg2,oppRedimg1,oppRedimg2,gameoverimg,bellsound,pinkgroup,yellowgroup,redgroup,gameover,restart
var player1,player2,player3
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  oppPinkimg1= loadAnimation("opponent1.png","opponent2.png");
  oppPinkimg2= loadAnimation("opponent3.png");
  oppYellowimg1= loadAnimation("opponent4.png","opponent5.png");
  oppYellowimg2= loadAnimation("opponent6.png");
  oppRedimg1= loadAnimation("opponent7.png","opponent8.png")
  oppRedimg2= loadAnimation("opponent9.png")
  gameoverimg= loadImage("gameOver.png")
  bellsound= loadSound("bell.mp3")
}

function setup(){
  
createCanvas(1200,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  gameover=createSprite(650,150)
  gameover.addImage(gameoverimg)
  gameover.scale=0.8
  gameover.visible=false
  pinkgroup=new Group()
  yellowgroup=new Group()
  redgroup=new Group()
  
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
  distance=distance+Math.round(getFrameRate()/50)
    path.velocityX=-(6+2*distance/50)
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    if(keyDown("space")){
      bellsound.play()
    }
    //creating continous opponent players 
    var select_oppPlayer = Math.round(random(1,3));
    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        pinkCyclists();
      } else if (select_oppPlayer == 2) 
      { yellowCyclists();
      } else { redCyclists(); }
    }
    if(pinkgroup.isTouching(mainCyclist)){ 
      gameState = END;
      player1.velocityY = 0;
      player1.addAnimation("opponentPlayer1",oppPinkimg2);
    }
if(yellowgroup.isTouching(mainCyclist)){
  gameState = END;
  player1.velocityY = 0;
  player1.addAnimation("opponentPlayer1",oppYellowimg2);
}
if(redgroup.isTouching(mainCyclist)){ 
  gameState = END;
  player1.velocityY = 0;
  player1.addAnimation("opponentPlayer1",oppRedimg2); }
 }
  else if(gameState===END){
    gameover.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    pinkgroup.setVelocityXEach(0);
    pinkgroup.setLifetimeEach(-1);
    yellowgroup.setVelocityXEach(0);
    yellowgroup.setLifetimeEach(-1);
    redgroup.setVelocityXEach(0);
    redgroup.setLifetimeEach(-1);
    if(keyDown("UP_ARROW")) 
    { reset(); }

  }
}
function pinkCyclists(){
  player1 =createSprite(1100,Math.round(random(50, 250)));
  player1.scale =0.06;
  player1.velocityX = -(6 + 2*distance/150);
  player1.addAnimation("opponentPlayer1",oppPinkimg1);
  player1.setLifetime=170;
  pinkgroup.add(player1);
}
function yellowCyclists(){
  player2 =createSprite(1100,Math.round(random(50, 250)));
  player2.scale =0.06;
  player2.velocityX = -(6 + 2*distance/150);
  player2.addAnimation("opponentPlayer2",oppYellowimg1);
  player2.setLifetime=170; yellowgroup.add(player2);
} 
function redCyclists(){
  player3 =createSprite(1100,Math.round(random(50, 250)));
  player3.scale =0.06;
  player3.velocityX = -(6 + 2*distance/150);
  player3.addAnimation("opponentPlayer3",oppRedimg1);
  player3.setLifetime=170;
  redgroup.add(player3);
} 
function reset(){ 
  gameState = PLAY;
  gameover.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1); 
  pinkgroup.destroyEach();
  yellogroup.destroyEach();
  redgroup.destroyEach();
  distance = 0;
}
