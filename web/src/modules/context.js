/*
  Handles client context state manipulation
*/

import Vue from 'vue'

class Context {

  constructor() {

    this._state = {

      users: [],

      listener: {
        id: this._generateUEID(),
        song: "",
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
    this._state.listener.song = song;
  }

  userChanged(change) {

    this._state.users = this._state.users.map(user => {
      if (user.id == change.id) user.song = change.song;
      return user;
    });

  }

  addUser(id) {

    this._state.users.push({
      id: id,
      song: ""
    });

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