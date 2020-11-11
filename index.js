const URL = 'http://localhost:3000';
const PORT = 5000;

const socket = require('socket.io-client')(URL);
const net = require('net');

let client;

socket.on('connect', () => {
  console.log('connected to ', URL);
});

socket.on('fromserialhex', (data) => {
  console.log('fromserialhex', data);
  client.write(Buffer.from(data, 'hex'));
});

socket.on('chat message', (data) => {
  console.log('chat', data);
});

socket.on('disconnect', () =>{
  console.log('disconnected');
});



const server = net.createServer((c) => {
  client = c;
  // 'connection' listener.
  console.log('client connected');

  c.on('end', () => {
    console.log('client disconnected');
  });

  c.on('data', (data) => {
    console.log('client data', data, data.toString('hex'));
    socket.emit('toserialhex', data.toString('hex'));
  });

  // c.write('hello\r\n');

  // c.pipe(c);

  //Buffer.from('1a7g', 'hex');

});

server.on('error', (err) => {
  throw err;
});

server.listen(PORT, () => {
  console.log('server bound, listening on', PORT);
  
});