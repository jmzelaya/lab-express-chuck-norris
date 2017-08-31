const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('layout', 'template.ejs');

app.use(expressLayouts);
app.use(express.static('public'));


app.get('/', (req, res, next) => {
  res.render('index.ejs');
});



app.get('/random', (req, res, next) => {

  client.getRandomJoke().then((response) => {
    res.locals.random = response.value;
    console.log('RANDOM JOKE------------------------');
    console.log();

    res.render('random.ejs');
  });
});

app.get('/categories', (req, res, next) => {
// req.params.cat
  client.getJokeCategories().then((response) => {
    res.locals.category = response;
    res.render('categories.ejs');

  });
});

app.get('/categories/:cat', (req, res, next) => {

  client.getRandomJoke(req.params.cat).then((response) => {
    res.locals.random = response.value;
    res.render('joke-by-category.ejs');

  });
});

app.get('/search', (req, res, next) => {
  client.search(keywordTerm)
  .then((response) => {
    res.render('search.ejs')
  }).catch((err) => {
    // handle error
  });
});



//---------------- END ROUTES -------------------

app.listen(3000);
