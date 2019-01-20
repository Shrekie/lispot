const io_socket = require('socket.io')(process.env.SOCKET_IO_PORT);
const redis = require('../modules/redis');
const uuidv1 = require('uuid/v1');

class Room {

  constructor() {

    io_socket.on("connection", (socket) => {
      
      console.log("heard something");
      this._attach(socket);
    
    });
    
    io_socket.on("disconnect", function () {
      // --
    });

  }

  _empty(name) {
    
    let room = io_socket.sockets.adapter.rooms[name];
    return room.length > 0;

  }

  _reserve (name, minutes) {

    setTimeout(() => {

      if (this._empty(name)) redis.del(name);

    }, 1000 * 60 * minutes);

  }

  _registered (name) {

    return redis.exists(name).then( exists => { 
      return exists;
    });

  }

  _merge (room, socket) {

    socket.join(room);
    socket.broadcast.to(room)
      .emit( "give_me" , socket.id );

  }

  /*
    ...
    On client emit to id their state.
    Then reciever broadcast to room all expect self its state.
  */
  _attach (socket) {

    socket.on('join', (data) => {

      this._registered(data.room).then( registered => {

        if(registered){

          this._merge(data.room, socket);

        } else {

          socket.emit('errors', "no room");

        }

      });

    });

  }

  /*
   * Reserves a empty room for x minutes. 
   * If room is populated at x minute check, 
   * normal socket disconnect removal is active.
   */
  book () {

    let room = uuidv1();
    redis.set(room, "1");
    this._reserve(room, 5);

    return { room };

  }

};

module.exports = Object.freeze(new Room());


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