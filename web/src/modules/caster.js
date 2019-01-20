import io from 'socket.io-client';

const socket = io('http://0.0.0.0:4000');

fetch('/book')
.then(function(response) {

  return response.json();

})
.then(function(json) {

  console.log(JSON.stringify(json));
  socket.emit('join', json);

});


/*
 * Broadcast state to data id
 */
socket.on('give_me', (data) => {

  console.log(data);

});

/*
 * Signal state updated
 */
socket.on('updated', (data) => {

  console.log(data);

});

socket.on("errors", (data) => {

  console.log(data);

});