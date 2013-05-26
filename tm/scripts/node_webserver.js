#!/usr/bin/env node

var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    debugger;

    // drop leading '/', and split @ '?' and @ '#'
    var filename = req.url.substring(1).split(/[?#]/g)[0];
    var content;
    if (fs.existsSync(filename)) {
        var ct =
            filename.match('.js$') ? 'text/javascript' :
            filename.match('.json$') ? 'application/json' :
            filename.match('.html$') ? 'text/html' :
            filename.match('.css$') ? 'text/css' :
            filename.match('.png$') ? 'image/png' :
            null;
        content = fs.readFileSync(filename);
        res.writeHead(200, {'Content-Type': ct});
        console.error(filename);
    }
    else {
        res.writeHead(404);
        console.error('** ' + filename);
    }
    res.end(content);
}).listen(8080);
