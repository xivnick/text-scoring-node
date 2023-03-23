const express = require('express');

const cookieParser = require('cookie-parser');
const routes = require('./route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});