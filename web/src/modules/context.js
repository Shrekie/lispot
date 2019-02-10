/*
  Handles client context state manipulation
*/

import Vue from 'vue'

class Context {

  constructor() {

    this._state = {

      users: Array,

      listener: {
        id: this._generateUEID(),
        name: "Thomas",
        song: "songname",
        connected: "USER_UEID"
      }

    };

    this._vm = new Vue({
      data: {
        state: this._state
      }
    });

  }

  select(ueid) {

    this._state.users = this._state.users.map(user => {

      if (user.id == ueid) {
        user.selected = true;
      } else user.selected = false;

    });

  }

  listenerChanged(song) {
    console.log(song);
    this._state.listener.song = song;
    Vue.set(this._vm, 'state', this._state);
  }

  addUser() {
    // ADD USER
    console.log("have not made this yet");
  }

  getListener() {
    return this._vm.state.listener;
  }

  getUsers() {
    return this._vm.state.users;
  }

  _generateUEID() {
    let x = 2147483648;
    return Math.floor(Math.random() * x).toString(36) +
      Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36);
  }

}

export default Object.seal(new Context());