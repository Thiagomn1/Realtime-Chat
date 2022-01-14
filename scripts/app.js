const chatList = document.querySelector('.chat-list');
const chatForm = document.querySelector('.new-chat');
const nameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

// Add new message
chatForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = chatForm.message.value.trim();
    chatroom.addChat(message).then(() => {
        chatForm.reset();
    }).catch(err => {
        console.log(err);
    });
});

// Set username
nameForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = nameForm.name.value.trim();
    chatroom.updateName(name);
    nameForm.reset();

    updateMsg.textContent = `Username was set to ${name}`;

    setTimeout(() => {
        updateMsg.classList.add('fade')
    }, 3000);
    setTimeout(() => {
        updateMsg.textContent = '';
    }, 4000);
    
});

// Update selected room
rooms.addEventListener('click', event => {
    if(event.target.tagName == 'BUTTON'){
        chatUI.clear();
        room = event.target.getAttribute('id');
        chatroom.updateRoom(room);
        chatroom.getChats(chat => {
            chatUI.render(chat);
        });
    }
});

// Check if username already exists
const username = localStorage.username ? localStorage.username : 'Anon';

// Instances
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('general', username);

// Get and render chat
chatroom.getChats(data => {
    chatUI.render(data);
});
