const express = require('express');
const handlebars = require('express-handlebars');
const { router } = require('./controllers/home');
const { sessionRouter } = require('./controllers/session');

const app = express();
const hbs = handlebars.create({
    extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use('/static', express.static('static'));

app.use(router);
app.use(sessionRouter);

app.listen(3000);