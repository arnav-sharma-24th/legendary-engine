var happydog, dog1;
var dog2;
var database;
var  foodS, foodStock,foodobj;
var feedDog,addFood;
var fedTime, lastFed;
function preload()
{
  dog1 = loadImage("images/dogImg.png");
  dog2 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1200, 1200);
  
  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  happyDog = createSprite(600,200,120,120);
  happyDog.addImage(dog1);
  happyDog.scale = 0.5

  feed=createButton("Feed the dog");
  feed.position(800, 95);
  feed.mousePressed (feedDog) ;

  addFood=createButton("Add Food");
addFood.position(900, 95);
addFood.mousePressed (addFoods) ;
}


function draw() {  
   background(46, 139, 87);
  foodObj.display();
fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
 
  
})


fill(255, 255, 254) ;
textSize(15) ;
if(lastFed>=12) {

text("Last Feed : "+ lastFed%12 + " PM", 550,30) ;
}else if(lastFed==0) {
text("Last Feed : 12 AM" , 550, 30) ;
}else{
text("Last Feed : "+ lastFed + " AM", 550,30);
}

  
  drawSprites();
  textSize(25)
  fill(123,123,211)
  text("Plese click up arrow. I am Hungry:[",150,20);
  //add styles here
 

}


//Function to read values from DB
function readStock(data) {
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
 
  //function to update food stock and last fed time
function feedDog () {
  happyDog.addImage(dog2);
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
  })
}

function addFoods () {

foodS++;
database.ref('/').update({
Food : foodS

})
}