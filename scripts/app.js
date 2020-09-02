//DOM query
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsgName = document.querySelector('.update-msg'); 
const nameCurrent = document.querySelector('#namecurrent');
const rooms = document.querySelector('.chat-rooms');

//Add a new msg chat by user 
newChatForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(()=>{
        newChatForm.reset();
    }).catch((err) =>{
        console.log(err);
    });
});
//Add a new name updated by user
newNameForm.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    //get name by form and update
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //name
    nameCurrent.innerHTML = username;
    //show and hide update msg 
    updateMsgName.innerHTML = `Your Name Is Updated to ${newName}`;
    setTimeout(()=>{
        updateMsgName.innerText ='';
    },3000);
    //reset name 
    newNameForm.reset();
    
});

//UPdate rooms
rooms.addEventListener('click', (e)=>{
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat =>{
            chatUI.render(chat);
        });
    }
});


//Check local storage for namne
const username = localStorage.name ? localStorage.name : 'Anonyms';

//class instance s
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);
// // getting chats 
chatroom.getChats((data) => {
    chatUI.render(data);
});
