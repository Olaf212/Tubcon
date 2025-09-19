// Importar funciones del chatbot.js
import {
    knowledgeBase,
    procesarMensaje,
    consultarWitAI,
    procesarEntidadesWit,
    procesarRespuestaLocal,
    consultarGemini
} from './chatbot.js';

document.addEventListener('DOMContentLoaded', function () {
    // Saludo inicial
    const saludoAleatorio = knowledgeBase.saludos[
        Math.floor(Math.random() * knowledgeBase.saludos.length)
    ];

    const mensajeDivDesktop = document.createElement('div');
    mensajeDivDesktop.className = 'message bot-message';
    mensajeDivDesktop.textContent = saludoAleatorio;
    document.getElementById('chatbotMessages').appendChild(mensajeDivDesktop);

    const mensajeDivMobile = document.createElement('div');
    mensajeDivMobile.className = 'message bot-message';
    mensajeDivMobile.textContent = saludoAleatorio;
    document.getElementById('mobileChatbotMessages').appendChild(mensajeDivMobile);

    // Eventos desktop
    document.getElementById('chatbotToggle').addEventListener('click', toggleChat);
    document.getElementById('sendButton').addEventListener('click', function () {
        sendMessage('userInput', 'chatbotMessages');
    });
    document.getElementById('userInput').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            sendMessage('userInput', 'chatbotMessages');
        }
    });

    // Eventos móvil
    document.getElementById('mobileSendButton').addEventListener('click', function () {
        sendMessage('mobileUserInput', 'mobileChatbotMessages');
    });
    document.getElementById('mobileUserInput').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            sendMessage('mobileUserInput', 'mobileChatbotMessages');
        }
    });
});

// Estado del chatbot
let isChatOpen = false;

function toggleChat() {
    const chatBody = document.getElementById('chatbotBody');
    isChatOpen = !isChatOpen;

    if (isChatOpen) {
        chatBody.classList.add('active');
        setTimeout(() => {
            const messages = document.getElementById('chatbotMessages');
            messages.scrollTop = messages.scrollHeight;
        }, 300);
    } else {
        chatBody.classList.remove('active');
    }
}

async function sendMessage(inputId, messagesId) {
    const userInput = document.getElementById(inputId);
    const messageText = userInput.value.trim();
    if (!messageText) return;

    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.textContent = messageText;
    document.getElementById(messagesId).appendChild(userMessageDiv);

    userInput.value = '';
    userInput.focus();

    const messages = document.getElementById(messagesId);
    messages.scrollTop = messages.scrollHeight;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;

    try {
        const respuesta = await procesarMensaje(messageText);

        const typingIndicator = messages.querySelector('.typing-indicator');
        if (typingIndicator) typingIndicator.remove();

        appendBotMessage(respuesta, messagesId);
    } catch (error) {
        console.error("Error procesando mensaje:", error);
        const typingIndicator = messages.querySelector('.typing-indicator');
        if (typingIndicator) typingIndicator.remove();

        appendBotMessage("No pude procesar tu solicitud en este momento. ¿Podrías intentarlo de nuevo?", messagesId);
    }
}

function appendBotMessage(message, messagesId) {
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message bot-message';
    botMessageDiv.innerHTML = message;
    document.getElementById(messagesId).appendChild(botMessageDiv);

    const messages = document.getElementById(messagesId);
    messages.scrollTop = messages.scrollHeight;
}

// Chatbot móvil
const mobileBubble = document.getElementById('mobileChatbotBubble');
const mobileWindow = document.getElementById('mobileChatbotWindow');
const closeMobile = document.getElementById('closeMobileChat');

if (mobileBubble && mobileWindow && closeMobile) {
    mobileBubble.addEventListener('click', function () {
        mobileWindow.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMobile.addEventListener('click', function () {
        mobileWindow.classList.remove('active');
        document.body.style.overflow = '';
    });

    let startY = 0;
    mobileWindow.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    });

    mobileWindow.addEventListener('touchmove', function (e) {
        const currentY = e.touches[0].clientY;
        if (currentY - startY > 100) {
            mobileWindow.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
