class ChatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    this.socket = io.connect("http://localhost:5000", {
      transports: ["websocket"],
    });

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;

    this.socket.on("connect", function () {
      console.log("connection established using sockets...!");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatRoom: "first room",
      });

      self.socket.on("user_join", function (data) {
        console.log("A user joined", data);
      });

      $("#send-message").click(function () {
        let msg = $("#chat-message-input").val();

        if (msg != "") {
          self.socket.emit("send_message", {
            message: msg,
            user_email: self.userEmail,
            chatRoom: "first room",
          });
        }
      });

      self.socket.on("receive_message", function (data) {
        console.log("message received", data);

        let newMessage = $("<li>");

        let msgType = "other-message";

        if (self.userEmail === data.user_email) {
          msgType = "self-message";
        }

        newMessage.addclass(msgType);

        newMessage.append($("<span>", { html: data.message }));
        newMessage.append($("<sub>", { html: data.userEmail }));

        $("#chat-messages-list").append(newMessage);
      });
    });
  }
}
