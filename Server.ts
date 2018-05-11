//Bindet Url Modul mit ein
import * as Url from "url";

//HTTP Objekt wird im Code erstellt 
//Interpreter sucht nach jedem m�glichen Import im http- Modul  und wird ihn einzeln an das http- Objekt im Code anh�ngen
import * as Http from "http";

//namespace erstellen
namespace Node {

    //Interface erstellen
    interface AssocStringString {

        //String als Schl�ssel, der Wert ist ebenfalls ein String
        //Homogenes assoziatives Array
        [key: string]: string;
    }

    //Port= Hafen oder T�re, in die Daten zur�ck kommen k�nnen
    //Variable port wird erstellt, als number
    //process.env.PORT= Port wird als Umgebungsvariable festgelegt, um dem Webserver mitzuteilen, welcher Port �berwacht werden soll.
    let port: number = process.env.PORT;

    //Wenn der Port nicht definiert ist, liegt er bei Nummer 8100
    //8100 (Portnummer) ist der Port, dem der Server zuh�ren soll
    if ( port == undefined )
        port = 8100;

    //Ereugung des Serverobjektes, Variable server, um mit dem Server weiter arbeiten zu k�nnen (Zugriff m�glich)
    let server: Http.Server = Http.createServer();

    //Wenn der Server zuh�rt, wird die Funktion handleListen ausgef�hrt
    server.addListener( "listening", handleListen );

    // Server beibringen auf etwas zu h�ren
    server.addListener( "request", handleRequest );
    server.listen( port );

    //Funktion handleListen wird erstellt, wenn der Server zuh�rt wird in der Konsole "Ich h�re" ausgegeben
    //In der Funktion werden keine Parameter ben�tigt
    function handleListen(): void {

        //Ausgabe im Terminal bzw. Konsole
        console.log( "Ich h�re?" );
    }

    //Funktion handleRequest wird erstellt, 2 Parameter werden festgelegt, ohne R�ckgabewert
    //Die einkommenden Information werden bearbeitet und wieder zur�ck geschickt
    //_request: Http.IncomingMessage: Einkommende Informationen
    //_response: Http.ServerResponse: Bearbeitete Informationen
    function handleRequest( _request: Http.IncomingMessage, _response: Http.ServerResponse ): void {

        //Ausgabe im Terminal bzw. Konsole
        console.log( "Ich h�re Stimmen!" );

        //Variable query wird erstellt
        //�bersetzung in ein assoziatives Array
        // umwandeln von /?a=10&b=20 in ein JavaScript-Objekt
        let query: AssocStringString = Url.parse( _request.url, true ).query;

        //Definiere a als Variable
        let a: number = parseInt( query["a"] );

        //Definiere a als Variable
        let b: number = parseInt( query["b"] );

        //Umlautprobleme werden behoben, Schriftart wird dadurch ebenfalls ge�ndert
        _response.setHeader( "content-type", "text/html; charset=utf-8" );

        //Wird f�r alle zug�nglich gemacht
        _response.setHeader( "Access-Control-Allow-Origin", "*" );

        //Ausgabe im Terminal bzw. Konsole
        _response.write( "Ich habe dich geh�rt<br/>" );

        //Schl�ssel wird durchgegeben
        for ( let key in query )
            //console.log(query[key]);
            //Ausgabe der Queryinformation (a, b)
            _response.write( "Query-Informationen, die eingegeben wurden: " + ( query[key] ) + "<br>" );

        //Wenn der Server zugeh�rt und die Daten bearbeitet wurden wird das Ergebnis ausgegben
        //L�sung erscheint im Browserfenster
        _response.write( "Das Ergebnis ist: " + ( a + b ) );

        //Ende, Inforamtion wird zum Nutzer geschickt
        _response.end();
    }
}