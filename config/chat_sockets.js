// now here we are going to request receive for the connection
module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer,{
        cors:{
            origin:'*'
        }
    });
    io.sockets.on('connection', function (socket) {
        console.log("new connection received", socket.id)
        socket.on('disconnect', function () {
            console.log("socket disconnected!!")
        })
        socket.on('join_room',function(data){
            console.log("request received to join the room ",data)
            // now after receiveing the request from the user then it will join the chatroom 
            socket.join(data.chatroom); 
            // here we are notifyig to self and other user who is available in the chat room to know __user has joined 
            io.in(data.chatroom).emit('user_joined',data)

            // CHANGE: detect the send message and brodcast everyone in the room
            socket.on('send_message',function(data){
                io.in(data.chatroom).emit('receive_message',data)
            })
        })
    })
}