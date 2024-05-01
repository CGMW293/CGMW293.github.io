// Get canvas and context from the DOM
const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');

// Set initial canvas dimensions to full window size
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Initialize particle array and mouse object for interaction
const particles = [];
const mouse = {
    x: null,
    y: null,
    radius: 150 // Interaction radius
};

// Create particles and initialize their properties
for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1, // Size of particle
        vx: Math.random() * 2 - 1, // Horizontal velocity
        vy: Math.random() * 2 - 1  // Vertical velocity
    });
}

// Mouse event listener to update mouse position
window.addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Function to draw each particle
function drawParticle(particle) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Color and opacity of particles
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
}

// Draw scene function
function draw() {
    ctx.clearRect(0, 0, width, height); // Clear the canvas
    particles.forEach(particle => {
        drawParticle(particle);
        updateParticle(particle);
    });
    requestAnimationFrame(draw); // Keep animating
}

// Update particle positions and handle interactions
function updateParticle(particle) {
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Simple boundary collision detection
    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;

    // Mouse interaction
    if (mouse.x - particle.x < mouse.radius && mouse.x - particle.x > -mouse.radius &&
        mouse.y - particle.y < mouse.radius && mouse.y - particle.y > -mouse.radius) {
        if (mouse.x < particle.x && particle.x < width - 10) {
            particle.x += 10;
        }
        if (mouse.x > particle.x && particle.x > 10) {
            particle.x -= 10;
        }
        if (mouse.y < particle.y && particle.y < height - 10) {
            particle.y += 10;
        }
        if (mouse.y > particle.y && particle.y > 10) {
            particle.y -= 10;
        }
    }
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

draw(); // Start the animation loop
