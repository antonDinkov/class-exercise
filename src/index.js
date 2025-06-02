const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const hbs = handlebars.create({
    extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    const cookieData = req.headers['cookie'];/* винаги тук се пише с малки букви, въпреки че в протокола са с главни */
    const cookies = Object.fromEntries(cookieData/* преобразуваме стринга в обект, като първо го превръщаме в масив от масиви */
            .split(';')
            .map(kvp => kvp.trim())
            .filter(kvp => kvp)
            .map(kvp => kvp.split('=')));

    const useDark = cookies.theme == 'dark'
    res.render('home', { useDark });
});

app.get('/set', (req, res) => {
    res.setHeader('Set-Cookie', 'my-cookie=hello')/* заглавието на хедъра Set-Cookie трябва да е точно написано иначе е невалиден хттп хедър */
    res.redirect('/');
});

app.get('/get', (req, res) => {
    const cookieData = req.headers['cookie'];/* винаги тук се пише с малки букви, въпреки че в протокола са с главни */
    console.log(cookieData);
    res.render('get');
});

app.get('/use-light', (req, res) => {
    res.setHeader('Set-Cookie', 'theme=light')/* заглавието на хедъра Set-Cookie трябва да е точно написано иначе е невалиден хттп хедър */
    res.redirect('/');
});

app.get('/use-dark', (req, res) => {
    res.setHeader('Set-Cookie', 'theme=dark')/* заглавието на хедъра Set-Cookie трябва да е точно написано иначе е невалиден хттп хедър */
    res.redirect('/');
});

app.listen(3000);