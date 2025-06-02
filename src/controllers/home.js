const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    const cookieData = req.headers['cookie'];/* винаги тук се пише с малки букви, въпреки че в протокола са с главни */
    const cookies = Object.fromEntries(cookieData/* преобразуваме стринга в обект, като първо го превръщаме в масив от масиви */
            .split(';')
            .map(kvp => kvp.trim())
            .filter(kvp => kvp)
            .map(kvp => kvp.split('=')));

    const useDark = cookies.theme == 'dark'
    res.render('home', { useDark });
});

router.get('/set', (req, res) => {
    res.setHeader('Set-Cookie', 'my-cookie=hello; HttpOnly; Secure')/* заглавието на хедъра Set-Cookie трябва да е точно написано иначе е невалиден хттп хедър */
    res.redirect('/');
});

router.get('/get', (req, res) => {
    const cookieData = req.headers['cookie'];/* винаги тук се пише с малки букви, въпреки че в протокола са с главни */
    console.log(cookieData);
    res.render('get');
});

router.get('/use-light', (req, res) => {
    res.setHeader('Set-Cookie', 'theme=light')/* заглавието на хедъра Set-Cookie трябва да е точно написано иначе е невалиден хттп хедър */
    res.redirect('/');
});

router.get('/use-dark', (req, res) => {
    res.setHeader('Set-Cookie', 'theme=dark')/* заглавието на хедъра Set-Cookie трябва да е точно написано иначе е невалиден хттп хедър */
    res.redirect('/');
});

module.exports = { router }