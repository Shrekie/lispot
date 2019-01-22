import io from 'socket.io-client';
import refresher from "./refresher.js"

const SpotifyConnect = { all: () => { return "allspotify" } };

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

      this.socket.emit("give_all_one", {

        connection: {
          room: this.room,
          reciever: data.reciever,
          route: "update_full"
        },

        update: SpotifyConnect.all()

      });

    });

  }

  _update () {

    this.socket.on('update_full', ( data ) => {

      console.log(data);

    });

  }

}

export default Object.seal(new Tenant());