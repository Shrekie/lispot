import refresher from "./refresher.js";

class Tracer {

  constructor ( ) {

    this._player = new Promise( (resolve, reject) => {

      window.onSpotifyWebPlaybackSDKReady = () => {

        var player = new Spotify.Player({
  
          name: 'Lispot',
          getOAuthToken: cb => { refresher.alive(cb); }
    
        });
      
        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { cronsole.error(message); });
      
        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });
      
        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });
      
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        resolve (player);
      
      };

    });

  }

  enable () {

    // #SUGGESTION: promise probably covered by robustness or something
    this._player.then( (player) => {

      player.connect();

    });

  }

}

export default Object.seal(new Tracer());