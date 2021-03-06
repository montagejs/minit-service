'use strict';

const express = require('express');
const routes = require('./routes');

const app = express();

routes(app, '/home/');

console.log('Listening on port 80');
app.listen(80);
