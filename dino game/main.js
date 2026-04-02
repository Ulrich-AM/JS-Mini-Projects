console.log("start");

//variables
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let floor = {
  x: 0,
  y: canvas.height - 100,
  width: canvas.width,
  height: 100,
  color: "rgb(95, 95, 95)",
};
let player = {
  x: 50,
  y: canvas.height - 150,
  width: 50,
  height: 50,
  yVel: 0.9,
  gVel: 0.7,
  color: "white",
};
let cactus = {
  x: canvas.width,
  y: canvas.height - 175,
  width: 25,
  height: 75,
  xVel: 1,
  color: "rgb(169, 169, 169)",
};
let cacti = [];
let nextCactus = 0;
let keyPressed = false;
let score = 0;
let frame = 0;

//functions
//create new cactus
function spawnCactus() {
  cacti.push({
    x: canvas.width,
    y: canvas.height - 175,
    width: 25,
    height: 75,
    xVel: 5,
    color: "rgb(169, 169, 169)",
  });
}

//collision aabb
function abT(a, b) {
  return (
    a.y + a.height >= b.y &&
    a.y + a.height <= b.y + b.height &&
    a.x + a.width > b.x &&
    a.x < b.x + b.width
  );
}
function abB(a, b) {
  return (
    a.y <= b.y + b.height &&
    a.y >= b.y &&
    a.x + a.width > b.x &&
    a.x < b.x + b.width
  );
}
function abL(a, b) {
  return (
    a.x + a.width >= b.x &&
    a.x + a.width <= b.x + b.width &&
    a.y + a.height > b.y &&
    a.y < b.y + b.height
  );
}
function abR(a, b) {
  return (
    a.x <= b.x + b.width &&
    a.x >= b.x &&
    a.y + a.height > b.y &&
    a.y < b.y + b.height
  );
}

document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    keyPressed = true;
    console.log("space pressed");
  }
});
document.addEventListener("keyup", function (event) {
  if (event.key === " ") {
    keyPressed = false;
  }
});

//update stuff
function update() {
  context.clearRect(0, 0, canvas.width, canvas.height); //update frames so its clean

  //add to score every update
  frame += 1;
  if (frame % 4 === 0) {
    score += 1;
  }
  //draw score
  context.fillStyle = "white";
  context.font = "20px Arial";
  context.fillText("score: " + score, 10, 25);

  //create imaginary floor for aesthetic purposes
  context.fillStyle = floor.color;
  context.fillRect(floor.x, floor.y, floor.width, floor.height);

  //I REALLY NEED TO CREATE A GRAVITY FUNCTION THIS IS SO MESSY

  //draw player
  context.fillStyle = player.color;
  context.fillRect(player.x, player.y, player.width, player.height);
  //gravity :)
  player.yVel += player.gVel;
  //jump only when player is on the ground
  if (keyPressed && abT(player, floor)) {
    player.yVel = -15;
  }
  //move the player to jump
  player.y += player.yVel;
  //collision with floor
  if (abT(player, floor)) {
    player.y = floor.y - player.height;
    player.yVel = 0;
  }

  //cactus spawning system
  if (frame >= nextCactus) {
    spawnCactus();
    nextCactus = frame + Math.floor(Math.random() * 200) + 50; //ramdom distance from cactus to cactus
  }
  //rendering the cacti
  for (let i = 0; i < cacti.length; i++) {
    let c = cacti[i];
    //move cactus to the side of the screen
    c.x -= c.xVel;
    //draw the cacti
    context.fillStyle = c.color;
    context.fillRect(c.x, c.y, c.width, c.height);
    //death and gameover
    if (abT(player, c) || abB(player, c) || abL(player, c) || abR(player, c)) {
      console.log("game over");
      context.font = "50px Arial";
      context.fillText("YOU LOST", canvas.width / 2, canvas.height / 2);
      context.font = "25px Arial";
      context.fillText(
        "final score: " + score,
        canvas.width / 2,
        canvas.height / 2 - 50,
      );
      return;
    }
  }
  //remove the cacti off screen to prevent lag
  cacti = cacti.filter((c) => c.x + c.width > 0);

  requestAnimationFrame(update);
}
update();

console.log("end");
