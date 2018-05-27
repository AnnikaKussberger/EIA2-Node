"use strict";
const Url = require("url"); //Bindet Url Modul mit ein
//HTTP Objekt wird im Code erstellt
const Http = require("http"); //Interpreter sucht nach jedem m�glichen Import im http- Modul  und wird ihn einzeln an das http- Objekt im Code anh�ngen
var Node;
(function (Node) {
    let studis = {};
    let port = process.env.PORT;
    if (port == undefined)
        port = 8100;
    let server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);
    function handleListen() {
    }
    function handleRequest(_request, _response) {
        _response.setHeader('Access-Control-Allow-Origin', '*'); //Header f�r Zugriff von anderen Servern
        _response.setHeader('Access-Control-Request-Method', '*');
        _response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET'); //Options: Abfrage: kann man auf den Server zugreifen?; GET: Antwort zur�ckbekommen
        _response.setHeader('Access-Control-Allow-Headers', '*');
        let query = Url.parse(_request.url, true).query; //Aus string wird ein Objekt gemacht
        //console.log(query);
        if (query["method"] == "addStudent") {
            let student = JSON.parse(query["data"].toString());
            studis[student.matrikel.toString()] = student;
            _response.write("Student added!"); // Antwort: Student added
            _response.end();
        }
        if (query["method"] == "refreshStudents") {
            _response.write(JSON.stringify(studis)); //stringify: Objekt wird zum string
            _response.end();
        }
    }
})(Node || (Node = {}));
//# sourceMappingURL=Server.js.map