const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
const particles = [];

const mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
});

for (let i = 0; i < 200; i++) {
    particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    });
}

function drawParticle(particle) {
    ctx.moveTo(particle.x, particle.y);
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
}

function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    particles.forEach(drawParticle);
    ctx.fill();
    updateParticles();
}

function updateParticles() {
    particles.forEach(particle => {
        let dx = particle.x - mouse.x;
        let dy = particle.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius;
            let forceMagnitude = Math.pow(force, 2) * 5; // Using square to smooth the force effect
            particle.x += dx / distance * forceMagnitude;
            particle.y += dy / distance * forceMagnitude;
        } else {
            particle.x += particle.vx;
            particle.y += particle.vy;
        }

        // Reflect particles off canvas edges
        if (particle.x <= 0 || particle.x >= w) particle.vx = -particle.vx;
        if (particle.y <= 0 || particle.y >= h) particle.vy = -particle.vy;
    });
}

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
setInterval(draw, 1000 / 60);
