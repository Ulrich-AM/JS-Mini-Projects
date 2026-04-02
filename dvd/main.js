//canvas
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.height = 800;
canvas.width = 1000;

//adjust
const xVelAdjust = document.getElementById("xVelAdjust");
const yVelAdjust = document.getElementById("yVelAdjust");
const heightAdjust = document.getElementById("heightAdjust");
const widthAdjust = document.getElementById("widthAdjust");
const colors = [
  "white",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
  "pink",
];
let colPick = 0;

//dvd
let dvd = {
  x: canvas.width / 2 - 50 / 2,
  y: canvas.height - 150,
  height: Number(heightAdjust.value),
  width: Number(widthAdjust.value),
  xVel: Number(xVelAdjust.value),
  yVel: Number(yVelAdjust.value),
};

//initialize
xVelAdjust.addEventListener("input", (e) => {
  dvd.xVel = Number(e.target.value);
});
yVelAdjust.addEventListener("input", (e) => {
  dvd.yVel = Number(e.target.value);
});
heightAdjust.addEventListener("input", (e) => {
  dvd.height = Number(e.target.value);
});
widthAdjust.addEventListener("input", (e) => {
  dvd.width = Number(e.target.value);
});

//aabb function
function AABB(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    console.log("collision");
    return true;
  }
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height); //update frames

  if (colPick >= 8) {
    colPick -= 8;
  }

  //creats dvd
  context.fillStyle = colors[colPick];
  context.fillRect(dvd.x, dvd.y, dvd.width, dvd.height);
  dvd.x += dvd.xVel;
  dvd.y += dvd.yVel;
  //collision
  if (dvd.x <= 0 || dvd.x + dvd.width >= canvas.width) {
    dvd.xVel *= -1;
    colPick += 1;
  }
  if (dvd.y <= 0 || dvd.y + dvd.height >= canvas.height) {
    dvd.yVel *= -1;
    colPick += 1;
  }

  requestAnimationFrame(update);
}

update();
