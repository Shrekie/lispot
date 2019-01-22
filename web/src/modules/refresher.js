class Refresher {

  constructor () {

  }

  //#Suggestion, maybe pack everything inside one method even middlewaring it somehow.
  alive() {
    return Promise.resolve();
  }

}

export default Object.freeze(new Refresher());