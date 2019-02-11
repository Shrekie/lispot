import io from 'socket.io-client';
import refresher from "./refresher.js"
import tracer from "./tracer.js";
import context from "./context.js";

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

  /*
   * Change has happened at tracer level, emit _device_change
   * and change listener client context.
   */
  change(data) {

    context.listenerChanged(data.track_window.current_track.name);

    this.socket.emit("emit_from", {

      connection: {
        room: this.room,
        reciever: context.getListener().id,
        route: "_device_change"
      },

      update: {

        song: {
          name: data.track_window.current_track.name,
          uri: data.track_window.current_track.uri,
        }

      },

    });

  }

  _join() {

    this.socket.emit("join", {

      connection: {
        room: this.room,
        reciever: context.getListener().id,
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

    /* 
      New client has connected, make them add your context with _create_context.
      Bind the representation with _bind_context.
    */
    this.socket.on('connection_new', (data) => {

      this._giveContext(data);

    });

  }

  _giveContext(data) {

    this.socket.emit("emit_from", {

      connection: {
        room: this.room,
        reciever: data.reciever,
        route: "_create_context"
      }

    });

  }

  _connectedContext(data) {

    this.socket.emit("emit_from", {

      connection: {
        room: this.room,
        reciever: context.getListener().id,
        route: "_bind_context"
      }

    });

  }

  _update() {

    this.socket.on('update', (data) => {

      (this[data.connection.route].bind(this) || (() => {
        alert("ROUTE DOES NOT EXIST");
      }))(data)

      //tracer.play(data.song);

    });

  }

  /*************************************************************
   **** _SOCKET_ROUTES_ *****************************************
   **************************************************************/

  // New client has succesfully connected, create the context for this node.
  _create_context(data) {

    if (data.connection.reciever != context.getListener().id) {
      context.addUser(data.connection.reciever);
      this._connectedContext();
    }

  }

  _bind_context(data) {
    if (data.connection.reciever != context.getListener().id) {
      context.addUser(data.connection.reciever);
    }
  }

  // Lispot device changed has triggered for a client, sync the changes.
  _device_change(data) {

    context.userChanged({
      id: data.connection.reciever,
      song: data.update.song
    })

  }

}

export default Object.seal(new Tenant());