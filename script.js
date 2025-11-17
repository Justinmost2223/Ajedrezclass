// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Progress bar
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = scrollPercent + '%';
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Survey functionality
const optionBtns = document.querySelectorAll('.option-btn');
const surveyNext = document.getElementById('surveyNext');
let selectedLevel = '';

optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        optionBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedLevel = btn.dataset.level;
        surveyNext.style.display = 'block';
        document.getElementById('level').value = selectedLevel;
    });
});

surveyNext.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Chat functionality
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Responses
const responses = {
    greetings: ['hola', 'buenas', 'hey'],
    madrid: ['madrid', 'presencial', 'centro'],
    grupo: ['grupo', 'personas', 'conocer', 'social'],
    openings: ['apertura', 'abrir', 'italiana', 'siciliana'],
    tactics: ['tactica', 'jaque', 'horquilla'],
    endings: ['final', 'finalizar', 'rey', 'peon'],
    classes: ['clase', 'curso', 'aprender'],
    price: ['precio', 'costo', 'tarifa', 'euro'],
    contact: ['telefono', 'llamar', 'contacto', 'numero']
};

const responseMessages = {
    greetings: '¡Hola! Con nosotros aprenderás ajedrez de forma profesional. Ponte en contacto cuanto antes y reserva tu plaza.',
    madrid: 'Nuestras clases son exclusivamente presenciales en Madrid. Con nosotros aprenderás con expertos. ¡Reserva tu plaza!',
    grupo: 'Con nosotros conocerás personas de tu mismo nivel. Aprenderás en grupo y crearás nuevas amistades. ¡Contacta ahora!',
    openings: 'Con nosotros dominarás las mejores aperturas. Nuestros expertos te guiarán paso a paso. ¡Reserva tu plaza!',
    tactics: 'Mejora tus tácticas con nosotros. Aprenderás combinaciones avanzadas. ¡Ponte en contacto cuanto antes!',
    endings: 'Domina los finales con nuestra metodología. Con nosotros aprenderás de verdad. ¡Reserva tu plaza!',
    classes: 'Nuestras clases presenciales son únicas. Con nosotros aprenderás con personas de tu nivel. ¡Contacta ahora!',
    price: 'Inversión mínima, resultados máximos. Con nosotros aprenderás profesionalmente. ¡Reserva tu plaza!',
    contact: 'Ponte en contacto con nosotros al 611 34 10 09. Aprenderás con los mejores. ¡Reserva tu plaza!'
};

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = `message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`;
    bubbleDiv.textContent = text;
    messageDiv.appendChild(bubbleDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    for (const [category, keywords] of Object.entries(responses)) {
        if (keywords.some(keyword => lowerMsg.includes(keyword))) {
            return responseMessages[category];
        }
    }
    return 'Con nosotros aprenderás ajedrez de forma profesional. Ponte en contacto cuanto antes y reserva tu plaza.';
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response);
        }, 500);
    }
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
const confirmationMessage = document.getElementById('confirmationMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const level = document.getElementById('level').value;
    const comments = document.getElementById('comments').value;
    const submission = { name, email, level, comments, timestamp: new Date().toISOString() };
    console.log('Form submitted:', submission);
    confirmationMessage.style.display = 'block';
    contactForm.reset();
    setTimeout(() => { confirmationMessage.style.display = 'none'; }, 8000);
});

// Smooth scrolling for nav links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Add welcome message on load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        addMessage('¡Bienvenido! Con nosotros aprenderás ajedrez profesionalmente. ¿En qué nivel te encuentras?');
    }, 1000);
});
