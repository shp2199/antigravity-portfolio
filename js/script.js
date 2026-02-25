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
const particlesContainer = document.getElementById('particles-container');

function updateGreeting() {
    currentIndex = (currentIndex + 1) % greetings.length;
    const current = greetings[currentIndex];
    
    // Add bounce effect
    container.classList.add('bouncing');
    
    setTimeout(() => {
        title.innerText = current.text;
        title.style.color = current.color;
        subline.innerText = `Greeting in ${current.lang}`;
        container.classList.remove('bouncing');
    }, 200);
}

container.addEventListener('click', updateGreeting);

// Create floating LEGO bricks
function createBrick() {
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

// Initial bricks
for (let i = 0; i < 15; i++) {
    createBrick();
}
setInterval(createBrick, 800);
