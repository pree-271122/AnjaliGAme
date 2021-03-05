const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

//creating variables
var engine, world;
var bgi1,bgi2,bgi4;
var button,butimg;
var jacky,jackimg,bird;
var gamestate="start"
var heart,heartImage,heart1,heart2,heart3;
var Lifeline,bulimg;
var home,score=0,coin;
var bg1,bg2,bg3;
var alien,gameover,gameimg;
var sound,sound2,sound3,sound4,sound5,sound6,sound7,sound8,sound9,sound10;
var LifelineGroup,magnetGroup,aliensGroup,birdsGroup,coinsGroup;

//load sound and images
function preload(){

  //loading Images
bgi1=loadImage("bg1.jpg")
bgi2=loadImage("bg2.jpg")
bg3i=loadImage("bg3.png")
bgi4=loadImage("bg4.jpg")
jackimg=loadImage("p.png")
bird=loadImage("bird.png")
alien=loadAnimation("alien1.png","alien1.png","alien2.png","alien2.png")
coin=loadAnimation("coin1.png","coin2.png","coin3.png")
bulimg=loadImage("bullet.png")
buttonimg=loadImage("icon3.png")
homeimg=loadImage("home.png")
gameimg=loadImage("game.png")
heartImage=loadImage("pink.png");
magnetimage=loadAnimation("m1.png","m2.png","m3.png","m4.png")


//loading sound
sound=loadSound("sound.mp3")
sound2=loadSound("music.mp3")
sound3=loadSound("sound3.mp3")
sound4=loadSound("b.mp3")
sound5=loadSound("coin.mp3")
sound6=loadSound("sound6.mp3")
sound10=loadSound("sound10.mp3")
sound7=loadSound("sound7.mp3")
sound8=loadSound("sound8.wav")
sound9=loadSound("sound9.mp3")
}

//setup function
function setup() {

  createCanvas(1300,545);
  engine = Engine.create()
  world = engine.world;

//background at start
bg1=createSprite(600,300,1300,600)
bg1.addImage("bg",bgi1)
bg1.scale=1.3

//second background at play
bg2=createSprite(600,10,1200,600)
bg2.addImage("bg",bgi2)
bg2.scale=1.3
bg2.visible=false
bg2.velocityX = -10

//third background at play
bg3=createSprite(700,100,1200,600)
bg3.addImage("bg",bg3i)
bg3.scale=4.2
bg3.visible=false
bg3.velocityX = -26

//fourth background at play
bg4=createSprite(700,100,1200,600)
bg4.addImage("bg",bgi4)
bg4.scale=1.3
bg4.visible=false
bg4.velocityX = -26

//The player
jacky=createSprite(600,300)
jacky.addImage("jack",jackimg)
jacky.scale=0.2;
jacky.visible=false

//groups for the non players
birdsGroup=createGroup()
coinsGroup=createGroup()
bulletGroup=createGroup()
aliensGroup=createGroup()
LifelineGroup=createGroup()
magnetGroup=createGroup()

//play button
button=createSprite(600,300)
button.addImage("play",buttonimg)
button.scale=0.2

//home button
home=createSprite(1250,60)
home.addImage("play",homeimg)
home.scale=0.2
home.visible=false

//Hearts
heart1=createSprite(300,90,20,20);
heart1.addImage("heart",heartImage);
heart1.scale=0.1;   
heart1.visible=false

heart2=createSprite(350,90,20,20);
heart2.addImage("heart",heartImage);
heart2.scale=0.1;   
heart2.visible=false

heart3=createSprite(400,90,20,20);
heart3.addImage("heart",heartImage);
heart3.scale=0.1;
heart3.visible=false

//gameover sprite
gameover=createSprite(600,300)
gameover.addImage("game",gameimg)
gameover.scale=1
gameover.visible=false

//death and score
death=3;
score=0;
}

function draw() {
  Engine.update(engine);
  background("white");  

//GAME STATE = START
 if(gamestate==="start"){
//visible condition

  home.visible=false
  jacky.visible=false
  bg2.visible=false
  bg1.visible=true
  button.visible=true
  text.visible=false
  
//when we press the button
if(mousePressedOver(button)){
  sound.play()
  sound2.play()
  gamestate="play"
}



 }
//GAME STATE = PLAY
 else if(gamestate==="play"){
//sounds
//sound.play()
//sound2.play()
text=createElement("h3")
text.html("SCORE : "+score)
text.position(330,100)
text.style('width', '100px');
text.style('height', '20px');
text.style('background','pink')
text2=createElement("h3")
text2.html("Lifetime : "+death)
text2.position(330,120)
text2.style('width', '110px');
text2.style('height', '20px');
text2.style('background','blue')




//visible condition
home.visible=true
jacky.visible=true
bg2.visible=true
bg1.visible=false
button.visible=false
heart1.visible=true
heart2.visible=true
heart3.visible=true

//Magnet
if(jacky.isTouching(magnetGroup)){ 
coinsGroup.destroyEach()
magnetGroup.destroyEach()
score=score+50
sound5.play()
}

//making background as never ending background
if (bg2.x < 0){bg2.x = bg2.width/2;}
if (bg3.x < 0){bg3.x = bg3.width/2;}
if (bg4.x < 0){bg4.x = bg4.width/2;}

 //giving condition for moving jacky 
 jacky.velocityY=0
 if(keyDown("UP_ARROW")){jacky.velocityY=-12 }
if(keyDown("DOWN_ARROW")){ jacky.velocityY=+12}

//spawning the birds
spawnbirds()

//spawning coins
spawncoins()

//spawning aliens
spawnaliens()

//spawninglifeline
spawnLifeline()

//spawning magnet
spawnmagnet()

//bullets
if (keyDown("space")) { 
  createBullet();
  sound3.play()
}

//destroying aliens
for (var i = 0; i < bulletGroup.length; i++) {
  if (bulletGroup.get(i).isTouching(aliensGroup)) {
      bulletGroup.get(i).destroy();
      aliensGroup.get(i).destroy();
      sound4.play()
        score=score+5
      
  }
}

//coins
for (var i = 0; i < coinsGroup.length; i++) {
  if (coinsGroup.get(i).isTouching(jacky)) {
      coinsGroup.get(i).destroy();
      sound5.play()
        score=score+10
      
  }
}

//aliens
for (var i = 0; i < aliensGroup.length; i++) {
  if (aliensGroup.get(i).isTouching(jacky)) {
      aliensGroup.get(i).destroy();
      sound7.play()
      death=death-1
  }
}

//Death
if(death===2){heart1.visible=false}
if(death===1){
  heart2.visible=false;
  heart1.visible=false
  
}
if(death===0){
  heart3.visible=false
  heart2.visible=false
  heart1.visible=false
}
if(death===-1){ 
  
  heart3.visible=false
  heart2.visible=false;
  heart1.visible=false
  gamestate="end"
  sound8.play()
}

//changing background
if(score===50){
sound2.stop()
bg2.visible=false
bg3.visible=true
jacky.visible=true
sound6.play()

}

//changing background
if(score===100){
  sound6.stop()
  sound2.stop()
  sound10.play()
  bg3.visible=false
  bg4.visible=true
  jacky.visible=true
  bg2.visible=false
}

//Home
for (var i = 0; i < LifelineGroup.length; i++) {
  if (LifelineGroup.get(i).isTouching(jacky)) {
      LifelineGroup.get(i).destroy();
      sound9.play()
      death=death+1
  }
}
}


//gamestate at end
 else if(gamestate==="end"){
   sound2.stop()
   bg2.velocityX=0
   bg3.velocityX=0
  aliensGroup.destroyEach()
  coinsGroup.destroyEach()
  birdsGroup.destroyEach()
  LifelineGroup.destroyEach()
  magnetGroup.destroyEach()  
  gameover.visible=true
 heart3.visible=false
 heart2.visible=false;
 heart1.visible=false
 
}

//mouse pressed on home
if(mousePressedOver(home)){
  sound.play()
  aliensGroup.destroyEach()
  coinsGroup.destroyEach()
  birdsGroup.destroyEach()
  LifelineGroup.destroyEach()
  magnetGroup.destroyEach()  
 gameover.visible=false
  gamestate="start"
  sound2.stop()
  //visible condition
  bg3.visible=false
  heart1.visible=false
  heart2.visible=false
  heart3.visible=false
  sound6.stop()
  
  }

drawSprites()


}

//function to spawnbirds
function spawnbirds() {
  
  if (frameCount % 200 === 0) {
    var birds = createSprite(1000,160,40,10);
    birds.y = Math.round(random(80,120));
    birds.addImage(bird);
    birds.scale = 0.02;
    birds.velocityX = -3;
    birds.lifetime = 400;
    
     birdsGroup.add(birds);
  }
}

//function to spawn coins
function spawncoins() {

  if (frameCount % 200 === 0) {
    var coins = createSprite(1200,10)
    coins.y = Math.round(random(20,370));
    coins.addAnimation("coin",coin);
    coins.scale = 0.3;
    coins.velocityX = -3;
    coins.lifetime = 400;
    coinsGroup.add(coins);
     
  }
  }

  //function to spawn aliens
  function spawnaliens() {

    if (frameCount % 300 === 0) {
      var aliens = createSprite(1000,160)
      aliens.y = Math.round(random(20,370));
      aliens.addAnimation("alien",alien);
      aliens.scale = 0.4;
      aliens.velocityX = -3;
    
      aliens.lifetime = 400;
      aliensGroup.add(aliens);  
    }
    }

    //function to create bullet
  function createBullet() {
    var bullet= createSprite(400, 100, 60, 10);
    bullet.addImage(bulimg);
    bullet.x =jacky.x
    bullet.y=jacky.y;
   
    bullet.velocityX = 4;
    bullet.lifetime = 200;
    bullet.scale = 0.1;
    bulletGroup.add(bullet)
    return bullet;
    
  }

  //function to spawn lifeline
  function spawnLifeline() {
  
    if (frameCount % 900 === 0) {
      var life = createSprite(1000,160,40,10);
      life.y = Math.round(random(80,120));
      life.addImage(heartImage);
      life.scale = 0.1;
      life.velocityX = -3;
      life.lifetime = 400;
      
       LifelineGroup.add(life);
    }
  }
  
  //function to spawn magnet
  function spawnmagnet() {
  
    if (frameCount % 200 === 0) {
      var magnet = createSprite(1000,160,40,10);
      magnet.y = Math.round(random(80,120));
      magnet.addAnimation("mg",magnetimage);
      magnet.scale = 0.1;
      magnet.velocityX = -3;
      magnet.lifetime = 400;
      
       magnetGroup.add(magnet);
    }
  }