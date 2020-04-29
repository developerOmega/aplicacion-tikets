const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl(); 

io.on('connection', (client) => {


    //on es escuchar al informacion enviada por el emit del frontend
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        
        console.log(siguiente);
        callback(siguiente);
        console.log(data);
    //    client.broadcast.emit('siguienteTicket', ticketControl.siguiente());

    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()  
    });

    client.on('atenderTicket', (data, callback) => {
        
        if( !data.escritorio ){
             return callback({
                 err: true,
                 mensaje: 'El escritorio es necesario'
             })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //Actualizar / notificar cambios en los ultimos 4
        // emitir 'ultimos4'
        client.broadcast.emit('ultimos4', {
            escritorio: data.escritorio,
            ultimos4: ticketControl.getUltimos4()
        });

    });


});