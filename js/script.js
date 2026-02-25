// --- Greeting Logic ---
const greetings = [
    { text: "Hello World", lang: "English", color: "#ff3e3e" },
    { text: "안녕 세상아", lang: "Korean", color: "#0076a3" },
    { text: "こんにちは世界", lang: "Japanese", color: "#f9d71c" },
    { text: "Hola Mundo", lang: "Spanish", color: "#ff3e3e" },
    { text: "Bonjour le monde", lang: "French", color: "#0076a3" },
    { text: "Ciao Mondo", lang: "Italian", color: "#f9d71c" },
    { text: "Hallo Welt", lang: "German", color: "#ff3e3e" },
    { text: "你好世界", lang: "Chinese", color: "#0076a3" }
];

let currentIndex = 0;
const title = document.querySelector('h1');
const subline = document.querySelector('p');
const container = document.querySelector('.container');

function updateGreeting() {
    currentIndex = (currentIndex + 1) % greetings.length;
    const current = greetings[currentIndex];

    container.classList.add('bouncing');

    setTimeout(() => {
        title.innerText = current.text;
        title.style.color = current.color;
        subline.innerText = `Greeting in ${current.lang}`;
        container.classList.remove('bouncing');
    }, 200);
}

if (container) {
    container.addEventListener('click', updateGreeting);
}

// --- Floating Bricks Logic ---
const particlesContainer = document.getElementById('particles-container');

function createBrick() {
    if (!particlesContainer) return;
    const brick = document.createElement('div');
    brick.className = 'brick';

    const colors = ['#ff3e3e', '#f9d71c', '#0076a3', '#ffffff'];
    brick.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const size = Math.random() * 15 + 10;
    brick.style.width = size + 'px';
    brick.style.height = size + 'px';
    brick.style.borderRadius = '4px';
    brick.style.border = '2px solid #2b2b2b';

    brick.style.left = Math.random() * 100 + 'vw';
    brick.style.top = '110vh';

    const duration = Math.random() * 5 + 7;
    brick.style.animationDuration = duration + 's';
    brick.style.animationDelay = Math.random() * 5 + 's';

    particlesContainer.appendChild(brick);

    setTimeout(() => {
        brick.remove();
    }, (duration + 5) * 1000);
}

for (let i = 0; i < 15; i++) {
    createBrick();
}
setInterval(createBrick, 800);

// --- Custom Cursor Logic ---
const cursorOuter = document.querySelector('.cursor-outer');
const cursorInner = document.querySelector('.cursor-inner');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Cursor movement
    cursorOuter.style.transform = `translate(${x}px, ${y}px)`;
    cursorInner.style.transform = `translate(${x}px, ${y}px)`;

    // Create Fairy Dust (Particles)
    createDust(x, y);
});

function createDust(x, y) {
    const dust = document.createElement('div');
    dust.className = 'dust';

    const size = Math.random() * 6 + 2;
    dust.style.width = size + 'px';
    dust.style.height = size + 'px';

    const colors = ['#ff3e3e', '#f9d71c', '#0076a3', '#ffffff'];
    dust.style.background = colors[Math.floor(Math.random() * colors.length)];

    dust.style.left = x + 'px';
    dust.style.top = y + 'px';

    // Spread effect
    const destX = (Math.random() - 0.5) * 50;
    const destY = (Math.random() - 0.5) * 50;
    dust.animate([
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });

    document.body.appendChild(dust);
    setTimeout(() => {
        dust.remove();
    }, 1000);
}

// --- Navigation Logic ---
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);

        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        // Update URL hash without jumping
        history.pushState(null, null, `#${targetId}`);
    });
});
