var dog,sadDog,happyDog, db;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;


function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
milk = loadImage("Images/Milk.png")
}

function setup() {

  createCanvas(1000,400);

  db=firebase.database();
  db.ref('food').on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);

  var x=80,y=100;
      
  imageMode(CENTER);
  image(milk,720,220,70,70);
  
  if(foodS!=0){
    for(var i=0;i<foodS;i++){
      if(i%10==0){
        x=80;
        y=y+50;
      }
      image(milk,x,y,50,50);
      x=x+30;
    }
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
}


//function to update food stock and last fed time
function feedDog(){
  foodS-=1
  db.ref('/').update({
 food:foodS
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  db.ref('/').update({
    Food:foodS
  })
}