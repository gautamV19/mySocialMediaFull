class chatEngine {
  constructor(chatBoxoId, userEmail) {
    this.chatBoxoId = ${`#${chatBoxoId}`};
    this.userEmail = userEmail;

    this.socket = io.connect("http://localhost:5000");

    if(this.userEmail){
        this.connectionHandler();
    }

  }

  connectionHandler(){
      this.socket.io("connect", function () { 
          console.log("Connection established");
       } )
  }
}
