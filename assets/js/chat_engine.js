// this class is used to send request to established the connection 
class ChatEngine {
    // while the chatbox start then it has a requirement of chatBoxId and userEmail
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        // now we have to make the connection with socket and here io is declared as global variable while we connect with chat engine
        this.socket = io.connect('http://localhost:5000');

        // but before the connection we have to make the connection handler so now
        if (this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;
        this.socket.on('connect', function () {
            console.log("connection established using sockets.......")
            // here we have given the command to join the room and providing the data such as email and providing the name of the room 
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            })
            // when the user will joined then these event will be fire
            self.socket.on('user_joined',function(data){
                console.log("user has joined",data)
            })

        })
        //CHANGE: send message on clicking the send message button
        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val();
            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.user_email,
                    chatroom:'codeial'
                })
            }
        })
        self.socket.on('receive_message',function(data){
            console.log("received message",data.message)
            let newMessage=$('<li>');
            let messageType='other-message'
            if(data.user_email==self.userEmail){
                messageType='self-message'
            }
            newMessage.append($('<span>',{
                'html':data.message
            }))
            newMessage.append($('<sub>',{
                'html':data.user_email
            }))
            newMessage.addClass(messageType)
            $('#chat-message-list').append(newMessage)
        })
}}