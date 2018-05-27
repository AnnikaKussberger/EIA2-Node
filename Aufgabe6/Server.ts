
import * as Url from "url" //Bindet Url Modul mit ein

//HTTP Objekt wird im Code erstellt

import * as Http from "http"; //Interpreter sucht nach jedem möglichen Import im http- Modul  und wird ihn einzeln an das http- Objekt im Code anhängen


namespace Node { //namespace erstellen
    let studis: L06_Interfaces.Studis = {};

    interface AssocStringString {
        [key: string]: string | string[];
    }

    
    let port: number = process.env.PORT;

    if ( port == undefined )
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener( "listening", handleListen );

    server.addListener( "request", handleRequest );
    server.listen( port );


    function handleListen(): void {

    }

    function handleRequest( _request: Http.IncomingMessage, _response: Http.ServerResponse ): void {
        
        
        
        _response.setHeader('Access-Control-Allow-Origin', '*'); //Header für Zugriff von anderen Servern
        _response.setHeader('Access-Control-Request-Method', '*');
        
        
         _response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET'); //Options: Abfrage: kann man auf den Server zugreifen?; GET: Antwort zurückbekommen
        _response.setHeader('Access-Control-Allow-Headers', '*');
        
       
        let query: AssocStringString = Url.parse(_request.url, true).query;  //Aus string wird ein Objekt gemacht
        //console.log(query);
        
        
        if (query["method"] == "addStudent") { //welche Methode wurde angegeben?, wenn addStudent dann Studen Liste hinzufügen
            let student = <L06_Interfaces.Studi>JSON.parse(query["data"].toString());
            studis[student.matrikel.toString()] = student;
            _response.write("Student added!"); // Antwort: Student added
            _response.end();
        }

    
        
        if (query["method"] == "refreshStudents") { //wenn Methode=refreshstudents, dann Liste der Studenten als Antwort
            _response.write(JSON.stringify(studis)); //stringify: Objekt wird zum string
            _response.end();
        }
    }
}