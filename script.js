const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let score = 0;
// Paddle
const paddle = { width: 120, height: 15, x: canvas.width / 2 - 60, y: canvas.height - 40, speed: 8, dx: 0 }; 
// Ball 
const ball = { x: canvas.width / 2, y: canvas.height - 60, radius: 8, dx: 4, dy: -4 }; 
// Bricks 
const rows = 5; const cols = 10; const bricks = []; for (let r = 0; r < rows; r++) { bricks[r] = [];
for (let c = 0; c < cols; c++)
    { bricks[r][c] = { x: c * 80 + 50, y: r * 40 + 50, status: 1, color: `hsl(${Math.random() * 360}, 100%, 60%)` }; 
} 
} 
// Controls 
document.addEventListener("keydown", e => { if (e.key === "ArrowRight") paddle.dx = paddle.speed; if (e.key === "ArrowLeft") paddle.dx = -paddle.speed; });
document.addEventListener("keyup", e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") paddle.dx = 0; }); 
// Draw paddle 
function drawPaddle() { ctx.shadowBlur = 20; ctx.shadowColor = "#0ff"; ctx.fillStyle = "#0ff"; ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height); 
    ctx.shadowBlur = 0; } 
// Draw ball 
function drawBall() { ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); ctx.fillStyle = "#fff"; ctx.shadowBlur = 15; ctx.shadowColor = "#fff"; ctx.fill(); ctx.closePath(); ctx.shadowBlur = 0; } // Draw bricks function drawBricks() { bricks.forEach(row => { row.forEach(brick => { if (brick.status === 1) { ctx.fillStyle = brick.color; ctx.shadowBlur = 15; ctx.shadowColor = brick.color; ctx.fillRect(brick.x, brick.y, 70, 25); ctx.shadowBlur = 0; } }); }); } // Collision detection function collision() { bricks.forEach(row => { row.forEach(brick => { if (brick.status === 1) { if ( ball.x > brick.x && ball.x < brick.x + 70 && ball.y > brick.y && ball.y < brick.y + 25 ) { ball.dy *= -1; brick.status = 0; score++; document.getElementById("score").innerText = "Pont: " + score; } } }); }); } // Update function update() { paddle.x += paddle.dx; // Wall limit if (paddle.x < 0) paddle.x = 0; if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width; ball.x += ball.dx; ball.y += ball.dy; // Bounce walls if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx *= -1; if (ball.y - ball.radius < 0) ball.dy *= -1; // Paddle collision if ( ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width ) { ball.dy *= -1; } // Bottom reset if (ball.y > canvas.height) { ball.x = canvas.width / 2; ball.y = canvas.height - 60; ball.dx = 4; ball.dy = -4; } collision(); } // Draw everything function draw() { ctx.clearRect(0, 0, canvas.width, canvas.height); drawPaddle(); drawBall(); drawBricks(); } // Game loop function loop() { update(); draw(); requestAnimationFrame(loop); } loop(); // Responsive window.addEventListener("resize", () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });