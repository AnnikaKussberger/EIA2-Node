"use strict";
const Url = require("url");
const Http = require("http");
var Node;
(function (Node) {
    let port = process.env.PORT;
    if (port == undefined)
        port = 8100;
    let server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);
    function handleListen() {
        console.log("Ich h�re?");
    }
    function handleRequest(_request, _response) {
        console.log("Ich h�re Stimmen!");
        let query = Url.parse(_request.url, true).query;
        let a = parseInt(query["a"]);
        let b = parseInt(query["b"]);
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write("Ich habe dich geh�rt<br/>");
        for (let key in query)
            //console.log(query[key]);
            _response.write("Query-Informationen, die eingegeben wurden: " + (query[key]) + "<br>");
        _response.write("Das Ergebnis ist: " + (a + b));
        _response.end();
    }
})(Node || (Node = {}));
//# sourceMappingURL=Server.js.map