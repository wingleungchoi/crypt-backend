import http from 'http';
import socket from 'socket.io';

import { PriceFrequency } from './lib/constants/apis';
import CryptoPriceTracker from './lib/apis/crypto_price_tracker';

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
  });
  response.end('Welcome to crypto api tracker\n');
});
const io = socket(server);

io.on('connection', (client) => {
  client.on('subscribeToPriceTricker', () => {
    console.log('client is subscribing to price tricker');
    CryptoPriceTracker.getAllPrices().then(prices => client.emit('prices', prices));
    setInterval(() => {
      CryptoPriceTracker.getAllPrices().then((prices) => {
        console.log('prices', prices);
        client.emit('prices', prices);
      });
    }, PriceFrequency);
  });
  client.on('disconnect', () => {});
});
server.listen(8000);
