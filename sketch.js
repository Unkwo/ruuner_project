var player, playerRunning, playerCollided, plr;
var Img, bg;
var lionImg, tigerImg, crocImg;
var enemy;
var invisibleGround, iRoof, iLeft, iRight;
var gameState = 0;
var bars, barsGroup;
var enemyGroup;
var score = 0;
var coins, coinsGroup;
var bullets = 100;
var bulletSprite, bullet, bulletGroup;



function preload(){
playerRunning = loadAnimation("assets/1.png", "assets/2.png", "assets/3.png",
"assets/4.png", "assets/5.png", "assets/6.png", "assets/7.png", "assets/8.png",
"assets/9.png", "assets/10.png");

lionImg = loadImage("assets/Lion.png");
tigerImg = loadImage("assets/Tiger.png");
crocImg = loadImage("assets/Croc.png");
Img = loadImage("assets/BG.png");
playerCollided = loadImage("assets/1.png");
}

function setup(){

  createCanvas(600,400);

  bg = createSprite(width/2, height/2, width, height);
  bg.addImage(Img);
  bg.scale = 0.6;

  player = createSprite(20, 380, 50, 50);
  player.scale = 0.6; 
  player.addAnimation("moving", playerRunning);
  player.visible = false;
  
  

invisibleGround = createSprite(200, height/height+height, width, 1);

player.isStatic = false;

barsGroup = new Group();
enemyGroup = new Group();
coinsGroup = new Group();
bulletGroup = new Group();
}

function draw() {
  
  background("white");

  player.collide(invisibleGround);
  
 player.collide(barsGroup);
 player.overlap(coinsGroup, function(collector, collected){
  score += 10;
  collected.remove();
})

  
  if(gameState == 0 ){
    text("Press space bar to play the game", 100, 200);
    textSize(15);
    stroke("black");

    if(keyDown("space")){
      gameState = 1;
      
    }
  }

  
  if(gameState == 1){
    if(bullets < 20){
      if(frameCount%160 == 0){
        bullet = createSprite(650, random(150,350), 10, 10);
        bullet.shapeColor = "white";
        bullet.velocityX = -4;
        bulletGroup.add(bullet);
      }
      if(bulletGroup.isTouching(player)){
        bullets += 20;
        bullets.destroyEach();
      }
    }
    adjustSpeedBg();
    spawnEnemy();
    text(score,200,200);
    player.visible = true;
     
    if(bg.x < width/3 ){
      bg.x = width/2;
    }
     if(keyDown(UP_ARROW)){
       player.velocityY = -8;
       
      }

     
      
     
      createBars();  
      spawnCoins();
      adjustSpeedEnemy();
      adjustSpeedCoins();
      adjustSpeedBars();
      createBullets();

      if(enemyGroup.isTouching(bulletSprite)){
        enemy.destroy();
        bulletSprite.destroy();
      }
  }

     
     
if(enemyGroup.isTouching(player)){
  gameState = 2;
}
     
      
    
    




if(gameState == 2){
  text("GAME OVER", 300, 200);
  fill ("Red");
  textSize(20);

  player.changeAnimation( "collided", playerCollided);
  barsGroup.velocityX = 0;
  barsGroup.destroyEach();

  enemyGroup.velocityX = 0;
enemyGroup.destroyEach();
coinsGroup.destroyEach();
coinsGroup.velocityX = 0;

player.destroy();
bg.velocityX = 0;

plr = createSprite(20, 380, 50, 50);
  plr.scale = 0.6; 
  plr.addImage(playerCollided);
}

  
    player.velocityY += 0.5;
 

  

  drawSprites();
        
}

function spawnEnemy(){
  if(frameCount%280 === 0){
    enemy = createSprite(650, player.y, 20, 30);
    enemy.collide(invisibleGround);
    enemy.scale = 0.2;
    enemy.velocityX = -2;
    enemyGroup.add(enemy);

    var rand = Math.round(random(1,3))

    if(rand ==1){
      enemy.addImage(lionImg);
    }else if(rand == 2){
      enemy.addImage(crocImg);
    }else if(rand == 3){
      enemy.addImage(tigerImg);
    }
  }

}

function createBars(){
  if(frameCount%150 == 0){
    bars = createSprite(650,random(150,350), 160, 10);
    bars.velocityX = -2;
    barsGroup.add(bars);
  }
}

function spawnCoins(){
  if(frameCount%80 == 0){
    coins = createSprite(650, random(150, 350), 10, 10);
    coins.shapeColor = "yellow";
    coins.velocityX = -2;
    coinsGroup.add(coins);
  }
  
}

function adjustSpeedBars(){
  if(score == 0){
    barsGroup.velocityX = -2;
    }else if(score == 100){
   barsGroup.velocityX = 2;
  }else if(score > 200 && score < 400){
    barsGroup.velocityX = -4;
  }else if(score > 400){
    barsGroup.velocityX = -6;
  }
}

function adjustSpeedBg(){
  if(score == 0){
    bg.velocityX = -2;
  }else if(score == 100){
    bg.velocityX = -3;
  }else if(score > 200 && score < 400){
    bg.velocityX = -4;
  }else if(score > 400){
    bg.velocityX = -6;
  }
}

function adjustSpeedCoins(){
  if(score == 0){
    
    coinsGroup.velocityX = -2;
  
    
  }else if(score == 100){
    
    coinsGroup.velocityX = -3;
    
  }else if(score > 200 && score < 400){
   
   coinsGroup.velocityX = -4;
    
  }else if(score > 400){
    
   coinsGroup.velocityX = -6;
    
  }
}

function adjustSpeedEnemy(){
  if(score == 0){
    
    enemyGroup.velocityX = -2;
  }else if(score == 100){
    
    enemyGroup.velocityX = -3;
    
  }else if(score > 200 && score < 400){
  enemyGroup.velocityX = -4;   
  }else if(score > 400){
   enemyGroup.velocityX = -6;
  }
}

function createBullets(){
  if(bullets > 0 && keyDown("enter")){
bulletSprite = createSprite(player.x, player.y, 5, 5);
bulletSprite.velocityX = 8;
bulletSprite.shapeColor = "white";
bullets -= 1;
  }
}


