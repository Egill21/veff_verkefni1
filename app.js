const express = require('express');
const path = require('path');
const lectures = require('./lectures.js');

const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const publicPath = path.join(__dirname, 'public');
const viewPath = path.join(__dirname, 'views');

app.set('views', viewPath);
app.set('view engine', 'ejs');

app.use(express.static(publicPath));
app.use('/', lectures);

app.get('/', (req, res) => {
  res.render('index', { title: 'Forsíða' });
});

function notFoundHandler(req, res, next) { // eslint-disable-line
  const type = '404 Error';
  const title = 'Síðan fannst ekki.';
  const message = 'Efnið sem þú ert að leita að finnst ekki.';
  res.status(404).render('error', { title, type, message });
}

function errorHandler(err, res, req, next) { // eslint-disable-line
  const type = '500 Error';
  const title = 'Innri netþjóna villa';
  const message = 'Netþjóninn klúðraði eitthverju. Sorry';
  res.status(500).render('error', { title, type, message });
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
