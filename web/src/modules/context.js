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
        name: String,
        song: String,
        connected: Boolean
      }

    };

    this._vm = new Vue({
      data: {
        users: this._state.users,
        listener: this._state.listener
      }
    });

    //Vue.set({}, this._vm, this._state); <-- (. we probably dont need this .)

  }

  select(ueid) {

    this._state.users = this._state.users.map(user => {

      if (user.id == ueid) {
        user.selected = true;
      } else user.selected = false;

    });

    //Vue.set(this._vm, 'users', this._state.users); <-- (. we probably dont need this .)

  }

  _generateUEID() {
    let x = 2147483648;
    return Math.floor(Math.random() * x).toString(36) +
      Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36);
  }

  getListener() {
    return this._state.listener;
  }

  getUsers() {
    return this._state.users;
  }

}

export default Object.seal(new Context());