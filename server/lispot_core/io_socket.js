const io_socket = require('socket.io')(3000);
const lobby = require('./lobby');

/*
 * Checks lobby to see if room is registered before joining filter namespace.
 */
const join = (socket) => {

  socket.on('join', (data) => {

    if (lobby.registered(data.room)) {

      io_socket.join(data.room);

      socket.broadcast.to(data.room)
        .emit( { action:'radio', user: socket.id} );

      /*
        ...
        On client emit to id their state.
        Then reciever broadcast to room all expect self its state.
      */

    } else {

      socket.emit('join_failed', "Room does not exist");

    }

  });

};

io_socket.on("connection", (socket) => {

  join(socket);

});

io_socket.on("disconnect", function () {
  // --
});

module.exports = io_socket;


/*

io_socket.on("connection", (socket) => {

  socket.on('event_name', (data) => {

    // this is used to send to all connecting sockets
    io.sockets.emit('eventToClient', { id: userid, name: username });
    // this is used to send to all connecting sockets except the sending one
    socket.broadcast.emit('eventToClient',{ id: userid, name: username });
    // this is used to the sending one
    socket.emit('eventToClient',{ id: userid, name: username });

  })

});

*/