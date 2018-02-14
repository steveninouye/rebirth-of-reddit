const express = require('express');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.hbs', {
    message: 'hello there from app.js'
  });
});

app.get('/viewReddit', (req, res) => {
  res.render('reddit.hbs', {
    message: 'hello there from app.js'
  });
});

app.get('/random', (req, res) => {
  res.render('random.hbs', {
    message: 'hello there from app.js'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
