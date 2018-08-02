var socket = io();

function scrollToBottom(){
    //selector
    var messages = jQuery('#messages');
    var newMessage = messages.children('li');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lasMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lasMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect',function(){
    var params = jQuery.deparam(window.location.search);
    socket.emit('join',params,function(err){
        if (err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('no error');
        }
    });
   
});
socket.on('disconnect',function(){
    console.log("disconnected from server");
});

// socket.on('newEmail',function(){
//     console.log('New Email',);

// });

socket.on('updateUserList',function(users){
    var ul = jQuery('<ol></ol>');

    users.forEach(function(user){
        ul.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ul);
});

socket.on('newMessage',function(message){
var formattedTime = moment(message.createdAt).format('h:mm a');
var template = jQuery('#message-template').html();
var html = Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:formattedTime

});

jQuery('#messages').append(html);
scrollToBottom();
    // console.log('newMessage',message);
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime} : ${message.text}`);
    // jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Frank',
//     text:'hei iam hank'
// },function(data){
//     console.log(data);
// });

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#messageLocation-template').html();
    var html = Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank"> My current location</a>');

    // li.text(`${message.from} ${formattedTime}`);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

var messageTextbox = jQuery('[name=message]');

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        text: jQuery('[name=message]').val()
    },function(){
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not Supporterd by your browser.')
    }

    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Send location')
        alert('Unable to fetch location.');
    });
});