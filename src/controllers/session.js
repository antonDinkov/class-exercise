const { Router } = require('express');
const { parseCookieData } = require('../util');
const { log } = require('handlebars/runtime');

const sessionRouter = Router();

const sessions = {};

sessionRouter.get('/set-session', (req, res) => {
    const id = getId();

    sessions[id] = {visits: 0};

    res.setHeader('Set-Cookie', `sessionId=${id}; HttpOnly; Secure`);
    res.redirect('/get-session');
});

sessionRouter.get('/get-session', (req, res) => {
    const cookieData = req.headers['cookie'];/* винаги тук се пише с малки букви, въпреки че в протокола са с главни */
    const cookies = parseCookieData(cookieData);

    const sessionId = cookies.sessionId;
    const session = sessions[sessionId];

    if(session) {
        session.visits++;
    }else{
        console.log('Anonymous user');
    };

    res.render('session', { visits: session?.visits || 0 });
});

function getId () {
    return 'xxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
};

module.exports = { sessionRouter };