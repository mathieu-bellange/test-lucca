const express = require('express');
const http = require('http');
const jsonBodyParser = require('body-parser').json();
const router = require('./proxy-router');

const apiApp = express();
const apiAppPort = 4201;

apiApp.use(jsonBodyParser);
apiApp.use('/api', router);

http.createServer(apiApp).listen(apiAppPort);
