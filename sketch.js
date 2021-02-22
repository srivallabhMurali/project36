var dog,sadDog,happyDog,milkFood;
var foodS;
var fedtime,lastFed;
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  milkFood=loadImage("Images/milk.png")
}

function setup() {

  database=firebase.database();

  createCanvas(1000,400);
  foodStock=database.ref('foodStock');
  foodStock.on('value',readStock)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("FEED THE DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("ADD FOOD");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  foodObj=new Food();
}

function draw() {
  background(46,139,87);
  foodObj.display();
fedTime=database.ref('feedTime');
fedTime.on('value',function(data){
  lastFed=data.val();
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
});
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){

dog.addImage(happyDog);

if(foodObj.getFoodStock()<=0){
  foodObj.updateFoodStock(foodObj.getFoodStock()*0);

}
else{

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

}
database.ref("/").update({
  foodStock:foodObj.getFoodStock(),
  feedTime:hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    foodStock:foodS
  });

}