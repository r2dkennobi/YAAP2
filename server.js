import path from 'path';
import bodyParser from 'body-parser';
import Express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

import * as api from './server/api/http';
import * as receiptService from './server/api/service/receipts';
import * as uni from './server/universalApp.js';

const app = Express();
const httpServer = http.Server(app);
const port = 3000;

var io = SocketIO(httpServer);

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'jade');

/*
 * Server midware
 */
app.use(require('serve-static')(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({
    limit: '25mb',
    extended: true
}));
app.use(bodyParser.json({limit: '25mb'}));

/*
 * Universal Application endpoint
 */
app.get('/', uni.handleRender);

/*
 * API Endpoints
 */
app.get('/api/0/receipts', api.getReceipts);
app.post('/api/0/receipts', api.addReceipt);
app.post('/api/0/receipts/:id', api.editReceipt);
app.delete('/api/0/receipts/:id', api.deleteReceipt);
app.post('/api/0/users', api.loginUser);
app.post('/api/0/users/create', api.createUser);
app.post('/api/0/users/:id', api.editUser);
app.delete('/api/0/users/:id', api.deleteUser);

receiptService.liveUpdates(io);

httpServer.listen(port);
