class Refresher {

  constructor() {

    this._user = null;

  }

  /*
   * Checks to see if session alive, if session not
   * alive, fetches new tokens and runs cb's.
   */
  alive(cb) {

    let method;

    if (this._user === null) {
      method = this._new();
    } else if (new Date() > this._user.expires) {
      alert("TOKEN EXPIRES");
    } else method = Promise.resolve(this._user.accessToken);

    return method.then(accessToken => {

      console.log(this._user);
      if (cb) cb(accessToken);
      return Promise.resolve(accessToken);

    });

  }

  _new() {

    return fetch('/user')
      .catch((error) => {
        throw new Error(error)
      }).then((response) => {

        if (response.status == 200) return response.json();
        else if (response.status == 401) {
          // #TODO: add remember route client storage
          window.location.replace('/auth/spotify');
        } else throw new Error("Response not recognized");

      }).then((response) => {

        this._user = JSON.parse(response);
        this._user.expires = new Date(this._user.expires * 1000);

      });

  }

}

export default Object.seal(new Refresher());