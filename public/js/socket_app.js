// Comando para establecer la coneccion

var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('Conectado al servidor');
})

socket.on('disconnect', function(){
    console.log('Desconectado del servidor');
})

socket.on('estadoActual', function(data){
    label.text(data.actual);
})

$('button').on('click', function(){
    
    //emit es para enviar informacion al servidor
    socket.emit('siguienteTicket', null ,function(siguienteTicket){
        
        label.text(siguienteTicket);       

    });

})
