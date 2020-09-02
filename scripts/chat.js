//add a new chat documents
class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
  }
  async addChat(message){
    const now = new Date();
    //format a chat object
    const chat ={
        message : message , 
        username : this.username,
        room: this.room,
        created_at : firebase.firestore.Timestamp.fromDate(now)
    }
    //save that document
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback){
    //it will check if there is updation on db
    //this property (.Where()) will check on condition where room == current room we are in
    this.unsub = this.chats
    .where('room' , '==' , this.room)
    .orderBy('created_at')
    .onSnapshot((snapshot) =>{
        snapshot.docChanges().forEach(change =>{
            if(change.type=== 'added'){
                //update UI
                callback(change.doc.data()); 
            }
        })
    });
  }
  updateName(username){
    this.username = username;
    localStorage.setItem('name' , this.username); 
  }
  updateRoom(room){
    this.room = room;
    console.log('room changed', room);
    // this.unsub();
    if(this.unsub){
        this.unsub();
    }
  }
}

