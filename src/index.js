const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const hbs = handlebars.create({
    extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/set', (req, res) => {
    res.setHeader('Set-Cookie', 'my-cookie=hello')/* заглавието на хедъра Set-Cookie трябва да е точно написано иначе е невалиден хттп хедър */
    res.redirect('/');
})

app.listen(3000);