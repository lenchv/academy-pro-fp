const express = require('express');
const app = express();

app.use('/', express.static('app'));

console.log('THe server is started on http://localhost:3000/');

app.listen(3000);
