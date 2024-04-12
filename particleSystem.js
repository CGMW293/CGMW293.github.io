const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
let particles = [];
let mouse = {
    x: null,
    y: null,
    radius: 100 // Increase or decrease the effect radius as needed
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    });
}

function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    particles.forEach(p => {
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
    });
    ctx.fill();
    update();
}

function update() {
    particles.forEach(p => {
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * 5;
        let directionY = forceDirectionY * force * 5;

        if (distance < mouse.radius) {
            p.x += directionX;
            p.y += directionY;
        } else {
            if (p.x !== p.vx) {
                p.x += p.vx;
            }
            if (p.y !== p.vy) {
                p.y += p.vy;
            }
        }

        // Reflect particles off canvas edges
        if (p.x <= 0 || p.x >= w) p.vx = -p.vx;
        if (p.y <= 0 || p.y >= h) p.vy = -p.vy;
    });
}

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
setInterval(draw, 1000/60);
