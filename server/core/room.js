const express = require('express');
const session = require('../modules/session');
const redis = require('../modules/redis');
const { authenticated } = require('../middleware/guard');
const uuidv1 = require('uuid/v1');

class Room {

  constructor() {

    this._io_socket = require('socket.io')(process.env.SOCKET_IO_PORT);
    this.router = express.Router();
    this._routes();

  }

  _routes () {

    this._io_socket.use(function(socket, next){
      
      session(socket.request, socket.request.res, next);

    });

    this._io_socket.on("connection", (socket) => {

      this._join(socket);
      this._give(socket);

    });
    
    this._io_socket.on("disconnect", (socket) => {

      console.log("lame");

    });

    this.router.get('/book', authenticated, (req, res) => {

      res.json(this._book());

    });

  }

  _registered (event, socket, cb) {

    socket.on(event, (data) => {

      redis.exists(data.connection.room).then( exists => {

        if(exists)
          cb(data);
        else
          socket.emit('connection_error', "authentication error");

      });

    });

  }

  _give (socket) {

    this._registered('give_all_one', socket, (data) => {

      io.to(data.connection.reciever).emit(data.connection.route, data.update);
      
    });

  }

  _join (socket) {

    this._registered('join', socket, (data) => {

      socket.join(data.connection.room);
      socket.broadcast.to(data.connection.room)
        .emit( "connection_new" , { reciever: socket.id } );

    })

  }

  _empty (name) {
    
    let room = this._io_socket.sockets.adapter.rooms[name];
    return room.length > 0;

  }

  _open (name, minutes) {

    setTimeout(() => {

      if (this._empty(name)) redis.del(name);

    }, 1000 * 60 * minutes);

  }

  _book () {

    let room = uuidv1();
    redis.set(room, "1");
    this._open(room, 5);

    return { room };

  }

};

module.exports = Object.freeze(new Room());