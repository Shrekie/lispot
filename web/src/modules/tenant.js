import io from 'socket.io-client';
import refresher from "./refresher.js"
import tracer from "./tracer.js";

const SpotifyConnect = 
{ all: () => { return { route:"all", data:"hellobaby" } } };

class Tenant {

  constructor ( room ) {

    this.room = room || Number;

    this.socket = io('http://0.0.0.0:4000');
    this._connection();
    this._update();

  }

  /*
   * Creates new room and joins it.
   */
  make () {

    return refresher.alive().then( ( session ) => {

      return fetch('/book', { redirect: "error" })
      .catch( ( error ) => {
        throw new Error(error)
      }).then( ( response ) => {
        return response.json();
      }).catch( () => {
        throw new Error("JSON not parsed.");
      }).then( ( response ) => {
        
        this.room = response.room;
        this._join();

        return this.room;
  
      });

    });

  }

  /*
   * Joins room.
   */
  enter ( room ) {

    if ( room != this.room ) {

      this.room = room;

      return refresher.alive().then( ( session ) => {

        this._join();
        return Promise.resolve();
  
      });

    }

  }

  _join() {

    this.socket.emit('join', { connection: { room: this.room } } );

  }

  _connection () {

    this.socket.on('connection_error', (data) => {

      console.log(data);

    });

    this.socket.on('connection_new', ( data ) => {

      console.log(data);

      this.socket.emit("give_all_to_single", {

        connection: {
          room: this.room,
          reciever: data.reciever,
        },

        update: SpotifyConnect.all(),

      });

    });

  }

  _update () {

    this.socket.on('update', ( data ) => {

      /*
       * Gets data and specifies caliber. This object to be sent to
       * spotifyconnect and fill client context.
       */
      console.log(data);

    });

  }

}

export default Object.seal(new Tenant());