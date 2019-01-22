import io from 'socket.io-client';
import refresher from "./refresher.js"

const SpotifyConnect = { all: () => { return "allspotify" } };

class Tenant {

  constructor () {

    this.room = Number;

    this.socket = io('http://0.0.0.0:4000');
    this._connection();

  }

  /*
   * Creates new room and joins it.
   */
  make () {

    refresher.alive().then( ( session ) => {

      fetch('/book', { redirect: "error" })
      .catch( ( error ) => {
        throw new Error(error)
      }).then( ( response ) => {
        return response.json();
      }).catch( () => {
        throw new Error("JSON not parsed.");
      }).then( ( response ) => {
        
        console.log(response.room);
        this.room = response.room;
        this.socket.emit('join', { connection: { room: response.room } } );
  
      });

    });

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
          reciever: data.reciever
        },

        update: SpotifyConnect.all()

      });

    });

  }

}

export default Object.seal(new Tenant());