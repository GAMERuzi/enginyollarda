const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gold = 0;
let timer = 0;
let truck = { x: 400, y: 320, width: 80, height: 40 };
let keys = {};
let coins = [];
let obstacles = [];

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  setInterval(update, 1000 / 60);
  setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = timer;
  }, 1000);
}

document.addEventListener("keydown", e => (keys[e.key] = true));
document.addEventListener("keyup", e => (keys[e.key] = false));

function drawTruck() {
  ctx.fillStyle = "gold";
  ctx.fillRect(truck.x, truck.y, truck.width, truck.height);
}

function spawnCoin() {
  coins.push({ x: Math.random() * 750, y: Math.random() * 300, r: 10 });
}

function spawnObstacle() {
  obstacles.push({ x: Math.random() * 750, y: Math.random() * 300, width: 30, height: 30 });
}

function drawCoins() {
  ctx.fillStyle = "yellow";
  coins.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(o => {
    ctx.fillRect(o.x, o.y, o.width, o.height);
  });
}

function checkCollisions() {
  coins = coins.filter(c => {
    const dx = truck.x + truck.width / 2 - c.x;
    const dy = truck.y + truck.height / 2 - c.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < truck.width / 2 + c.r) {
      gold++;
      document.getElementById("gold").textContent = gold;
      return false;
    }
    return true;
  });

  obstacles.forEach(o => {
    if (
      truck.x < o.x + o.width &&
      truck.x + truck.width > o.x &&
      truck.y < o.y + o.height &&
      truck.y + truck.height > o.y
    ) {
      alert("Polise yakalandın!");
      location.reload();
    }
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTruck();
  drawCoins();
  drawObstacles();
  checkCollisions();

  if (keys["ArrowLeft"]) truck.x -= 5;
  if (keys["ArrowRight"]) truck.x += 5;

  // Truck sınır dışına çıkmasın
  if (truck.x < 0) truck.x = 0;
  if (truck.x + truck.width > canvas.width) truck.x = canvas.width - truck.width;

  if (Math.random() < 0.02) spawnCoin();
  if (Math.random() < 0.01) spawnObstacle();
}
