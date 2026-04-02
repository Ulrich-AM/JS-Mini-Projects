//so my life is easier and i dont need to keep on creating functions individually

//collision functions
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