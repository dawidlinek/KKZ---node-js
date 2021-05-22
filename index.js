let http = require('http');
let routes = require('./routes.js');
const urlParser = require('url');

http.createServer(async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let url = urlParser.parse(req.url,true);
    if (url.pathname in routes) { res.write(await routes[url.pathname](url.query)) };
    res.end();
}).listen(8080);

