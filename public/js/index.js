var socket = io();
socket.on('connect',function(){
    console.log('connected to server');
    socket.emit('createMessage',{
        from:'Andrew',
        text:'yap this is work'
    });
});
socket.on('disconnect',function(){
    console.log("disconnected from server");
});

socket.on('newEmail',function(){
    console.log('New Email',);

});

socket.on('newMessage',function(message){
    console.log('newMessage',message);
});