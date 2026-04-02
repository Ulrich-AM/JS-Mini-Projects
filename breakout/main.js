console.log("initializing");

//constants and variables
const canvas = document.getElementById("canvas"); //set up canvas
const context = canvas.getContext("2d");
let points = 0;
let gameOver = false;

//controls
let rghtPressed = false;
let leftPressed = false;

//paddle
let spdPad = 15;
let wdtPad = 100;
let hgtPad = 20;
let yPad = canvas.height - 50;
let xPad = canvas.width / 2 - wdtPad / 2; //formula to align in the middle

//ball
let spdxBall = 10;
let spdyBall = 5;
let radBall = 10;
let yBall = 400;
let xBall = canvas.width / 2;

//blocks
let arrBlock = [];
let wdtBlock = 50;
let hgtBlock = 20;
let colBlock = 7;
let rowBlock = 2; //add more everytime the block count = 0 so its more fun
let countBlock = 0; //number of blocks
let maxRow = 10; //so it doesn't touch the paddle, that would be catastrophic

let yBlock = 45;
let xBlock = 15;

//paddle controls
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft" || event.key === "a") {
    rghtPressed = true;
  }
  if (event.key === "ArrowRight" || event.key === "d") {
    leftPressed = true;
  }
});
document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowLeft" || event.key === "a") {
    rghtPressed = false;
  }
  if (event.key === "ArrowRight" || event.key === "d") {
    leftPressed = false;
  }
});

//circle drawing function
function drawCircle(x, y, radius, color) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

//blocks drawing function
function createBlocks() {
  arrBlock = [];
  for (let c = 0; c < colBlock; c++) {
    for (let r = 0; r < rowBlock; r++) {
      let block = {
        x: xBlock + c * wdtBlock + c * 12,
        y: yBlock + r * hgtBlock + r * 10,
        wdt: wdtBlock,
        hgt: hgtBlock,
        break: false,
      };
      arrBlock.push(block);
    }
  }
  countBlock = arrBlock.length;
  console.log(`blocks: ${countBlock}`);
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height); //clear and update frames

  //gameover
  if (gameOver) {
    context.font = "25px sans-serif";
    context.fillText("YOU LOST", 165, canvas.height / 2);
    return;
  }

  context.font = "20px sans-serif";
  context.fillText(points, 10, 25);

  //paddle
  context.fillStyle = "white";
  context.fillRect(xPad, yPad, wdtPad, hgtPad);
  //paddle movement
  if (rghtPressed && !(xPad <= 0)) {
    xPad -= spdPad;
  }
  if (leftPressed && !(xPad + wdtPad >= canvas.width)) {
    xPad += spdPad;
  }

  //ball
  let yPrev = yBall; //store previous ball position
  xBall += spdxBall;
  yBall += spdyBall;

  //blocks
  context.fillStyle = "white";
  for (let i = 0; i < arrBlock.length; i++) {
    let block = arrBlock[i];
    if (!block.break) {
      //this is what i get for not creating a function for collisions ;-;
      if (
        xBall + radBall >= block.x &&
        xBall - radBall <= block.x + block.wdt &&
        yBall + radBall >= block.y &&
        yBall - radBall <= block.y + block.hgt
      ) {
        block.break = true;
        countBlock -= 1;
        points += 50;

        if (
          yPrev + radBall <= block.y ||
          yPrev - radBall >= block.y + block.hgt
        ) {
          //came from top or bottom
          spdyBall *= -1;
        } else {
          //came from left or right
          spdxBall *= -1;
        }
      }
      context.fillRect(block.x, block.y, block.wdt, block.hgt);
    }
  }

  //x axis collision
  if (xBall - radBall <= 0 || xBall + radBall >= canvas.width) {
    spdxBall *= -1;
  }
  //y axis collision
  if (yBall - radBall <= 0) {
    spdyBall *= -1;
  }
  //y axis collision with paddle (help)
  if (yBall + radBall >= yPad && yBall + radBall <= yPad + hgtPad) {
    if (xBall >= xPad && xBall <= xPad + wdtPad) {
      spdyBall *= -1;
      yBall = yPad - radBall; //so ball doesnt glitch inside paddle
    }
  }
  //hit floor (gameover)
  if (yBall + radBall >= canvas.height) {
    gameOver = true;
  }

  drawCircle(xBall, yBall, radBall, "white");
  requestAnimationFrame(update);
}

update();
createBlocks();

console.log("everything is working!");
