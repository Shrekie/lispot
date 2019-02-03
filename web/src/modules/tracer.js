import refresher from "./refresher.js";
import tenant from "./tenant.js";

class Tracer {

  constructor() {

    this._player = new Promise((resolve, reject) => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve();
      };
    });

    this._deviceID = String;

  }

  enable() {

    // #SUGGESTION: promise probably covered by robustness or something
    return this._player.then(() => {

      var player = new Spotify.Player({

        name: 'Lispot',
        getOAuthToken: cb => { refresher.alive(cb); }

      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      player.addListener('player_state_changed', state => {
        console.log(state);
        tenant.change(state);
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        this._deviceID = device_id;
        //this._playSong();
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect();

    });

  }

  play(songUri) {

    return refresher.alive().then(token => {

      return fetch("https://api.spotify.com/v1/me/player/play?device_id=" + this._deviceID, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + token
        },
        body: JSON.stringify({ 'uris': [songUri] }),
      }).then(response => console.log(response));

    });

  }

  currently() {

    return refresher.alive().then(token => {

      return fetch("https://api.spotify.com/v1/me/player", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + token
        }
      }).then(response => { return response.json() });

    });

  }

}

export default Object.seal(new Tracer());