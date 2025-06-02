function parseCookieData(cookieData) {
    if (!cookieData) {
        return {};
    }
    const cookies = Object.fromEntries(cookieData/* преобразуваме стринга в обект, като първо го превръщаме в масив от масиви */
        .split(';')
        .map(kvp => kvp.trim())
        .filter(kvp => kvp)
        .map(kvp => kvp.split('=')));

    return cookies;
};


module.exports = { parseCookieData };