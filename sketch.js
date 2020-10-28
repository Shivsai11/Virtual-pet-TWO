var dog, happyDog, database, food, foodStock, dogimg, happyDogimg, feedButton, addButton;
var lastFed, milkDisplay;

function preload()
{
  dogimg = loadImage("dogImg.png");
  happyDogimg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(800, 600);
  database = firebase.database();
  dog = createSprite(400, 300, 20, 20);
  dog.addImage(dogimg, 400, 300);
  dog.scale = 0.2;

  foodStock = database.ref("Food").on("value", readStock);
  feedButton = createButton("Feed the dog");
  feedButton.position(350, 550);
  feedButton.mousePressed(()=>{
    updateStock(food);
    dog.addImage(happyDogimg);
  })

  addButton = createButton("Add food");
  addButton.position(360, 520);
  addButton.mousePressed(()=>{
    addFood(food);
  })
  lastFed = hour();
  milkDisplay = new Food();
}

function draw() {  
  background(mouseX, mouseY, 80);
  drawSprites();
  //if(keyWentDown("up")){
    //updateStock(food)
    //dog.addImage(happyDogimg);
 // }
  textSize(25);
  fill("blue");
  textFont("Impact");
  text("Remaining food: "+ food, 300, 50);

  if(lastFed>=12){
    fill("red");
    text("Last Fed: "+ lastFed%12 + "PM", 330, 500);
  }
  else if(lastFed===0){
    fill("red");
    text("Last Fed: 12AM", 330, 500);
  }
  else{
    fill("red");
    text("Last Fed: "+lastFed + "AM", 330, 500);
  }
  milkDisplay.display();
}

function readStock(data){
  food = data.val();
}
function updateStock(x){
   if(x<=0){
     x = 0;
   }
   else{
     x = x - 1;
   }
   database.ref('/').update({
    Food:x,
    feedTime:lastFed
  });
}
function addFood(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x + 1;
  }
  database.ref('/').update({
  Food:x
 });
}

