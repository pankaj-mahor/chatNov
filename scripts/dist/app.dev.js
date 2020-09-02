"use strict";

//DOM query
var chatList = document.querySelector('.chat-list');
var newChatForm = document.querySelector('.new-chat');
var newNameForm = document.querySelector('.new-name');
var updateMsgName = document.querySelector('.update-msg');
var nameCurrent = document.querySelector('#namecurrent');
var rooms = document.querySelector('.chat-rooms'); //Add a new msg chat by user 

newChatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var message = newChatForm.message.value.trim();
  chatroom.addChat(message).then(function () {
    newChatForm.reset();
  })["catch"](function (err) {
    console.log(err);
  });
}); //Add a new name updated by user

newNameForm.addEventListener('submit', function (e) {
  e.preventDefault(); //get name by form and update

  var newName = newNameForm.name.value.trim();
  chatroom.updateName(newName); //name

  nameCurrent.innerHTML = username; //show and hide update msg 

  updateMsgName.innerHTML = "Your Name Is Updated to ".concat(newName);
  setTimeout(function () {
    updateMsgName.innerText = '';
  }, 3000); //reset name 

  newNameForm.reset();
}); //UPdate rooms

rooms.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(function (chat) {
      chatUI.render(chat);
    });
  }
}); //Check local storage for namne

var username = localStorage.name ? localStorage.name : 'Anonyms'; //class instance s

var chatUI = new ChatUI(chatList);
var chatroom = new Chatroom('general', username); // // getting chats 

chatroom.getChats(function (data) {
  chatUI.render(data);
});