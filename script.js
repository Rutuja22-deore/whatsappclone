const socket = io(); // Connect to the server

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatBox = document.getElementById('chat-box');

// Function to append a new message to the chat
function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Send message when the button is clicked
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim()) {
        appendMessage(message, 'user');
        socket.emit('chat message', message); // Send message to the server
        messageInput.value = '';
    }
});

// Send message when the Enter key is pressed
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

// Receive message from the server
socket.on('chat message', (message) => {
    appendMessage(message, 'bot');
});
