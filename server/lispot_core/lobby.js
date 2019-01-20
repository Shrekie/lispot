const uuidv1 = require('uuid/v1');
const redis = require('../modules/redis');
const io_socket = require('./io_socket');


class Lobby {

  constructor() {

  }

  _empty(name) {
    
    var room = io_socket.sockets.adapter.rooms[name];
    return room.length > 0;

  }

  _reserve (name, minutes) {

    setTimeout(() => {

      if (room._empty(name)) redis.del(name);

    }, 1000 * 60 * minutes);

  }

  /*
   * Reserves a empty room for x minutes. 
   * If room is populated at x minute check, 
   * normal socket disconnect removal is active.
   */
  book () {

    const name = uuidv1();
    redis.set(name, "1");
    _reserve(name, 5);

    return {name};

  }

  /*
   * Checks if room is registered before letting socket join room.
   */
  registered (name) {

    return redis.exists(name).then( exists => { 
      return exists;
    });

  }

};

module.exports = Object.freeze(new Lobby());