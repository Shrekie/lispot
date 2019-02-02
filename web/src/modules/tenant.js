import io from 'socket.io-client';
import refresher from "./refresher.js"
import tracer from "./tracer.js";

class Tenant {

  constructor(room) {

    this.room = room || Number;

    this.socket = io('http://0.0.0.0:4000');
    this._connection();
    this._update();

  }

  /*
   * Creates new room and joins it.
   */
  make() {

    return refresher.alive().then(token => {

      return fetch('/book')
        .catch((error) => {
          throw new Error(error)
        }).then((response) => {
          return response.json();
        }).then((response) => {

          this.room = response.room;
          this._join();

          return this.room;

        });

    });

  }

  /*
   * Joins room.
   */
  enter(room) {

    if (room != this.room) {

      this.room = room;

      return refresher.alive().then(token => {

        this._join();
        return Promise.resolve();

      });

    }

  }

  _join() {

    this.socket.emit('join', {
      connection: {
        room: this.room
      }
    });

  }

  _connection() {

    this.socket.on('connection_error', (data) => {

      console.log(data);

    });


    this.socket.on('connection_success', (data) => {

      tracer.enable();

    });

    this.socket.on('connection_new', (data) => {

      this._giveContext();

    });

  }

  _giveContext() {

    tracer.currently().then(context => {

      this.socket.emit("give_to_single", {

        connection: {
          room: this.room,
          reciever: data.reciever,
        },

        update: {
          caliber: "create_context",
          song: context.item.uri,
          client: socket.id
        },

      });

    });

  }

  _update() {

    this.socket.on('update', (data) => {

      tracer.play(data.song);

    });

  }

}

export default Object.seal(new Tenant());