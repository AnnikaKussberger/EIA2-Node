namespace L06_Interfaces {
    window.addEventListener( "load", init );

    let address: string = "https://eia2node257455.herokuapp.com/";
    function init( _event: Event ): void {
        console.log( "Init" );

        
        let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById( "insert" );  //Enventlistener auf Button �bergeben
        let searchButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById( "search" );
        let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById( "refresh" );
        
        
        
        let exampleButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById( "exampleData" ); //Button f�r drei Bespieldatens�tze
        insertButton.addEventListener( "click", insert );
        
        
        
        refreshButton.addEventListener( "click", refreshStudents ); //Wenn geklickt wird wird refreshStudents ausgrf�hrt
        searchButton.addEventListener( "click", search );
        exampleButton.addEventListener( "click", exampleData )
    }

    
    
    function exampleData() { //Drei Datensatzbeispiele
        for (let i = 0; i < 3; i++) {
            
            
            
            let student: L06_Interfaces.Studi = { //Zugriff auf Interface studi
                name: "Nachname " + i,
                firstname: "Jeff" + i,
                matrikel: Math.floor(Math.random() * 222222),
                age: Math.floor(Math.random() * 22),
                gender: !!Math.round(Math.random()),
                studiengang: "OMB"
            }
        
            
        
            sendDataToHost("addStudent", student) //Funktion sendDataToHost, Variable student wird an sendDataToHost �bergeben
        }
    }


    
    function insert( _event: Event ): void {  //Funktion um Daten der Studenten zu speichern
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName( "input" );
        let genderButton: HTMLInputElement = <HTMLInputElement>document.getElementById( "male" );
        let matrikel: string = inputs[2].value;
        let studi: Studi;

        
        studi = {  //Interface �bergeben
            name: inputs[0].value,
            firstname: inputs[1].value,
            matrikel: parseInt( matrikel ),
            age: parseInt( inputs[3].value ),
            gender: genderButton.checked,
            studiengang: document.getElementsByTagName( "select" ).item( 0 ).value,
        };

        console.log( studi );
        console.log( studi.age );
        
        console.log( studi["age"] );

       
        studiHomoAssoc[matrikel] = studi;  // Datensatz im assoziativen Array unter der Matrikelnummer speichern

        
        studiSimpleArray.push( studi ); 
        
        
       
        sendDataToHost("addStudent", studi); //Funktion sendDataToHost, Objekt studi wird �bergeben, Methode addStudent 
    }

    //Serverfunktion refreshStudents wird ausgef�hrt
    //Funktion refreshStudents holt sich die Liste der ganzen Daten vom Server
    
    function refreshStudents(_event: Event): void { //Methode refreshStudents
        sendDataToHost("refreshStudents");
    }

    function refresh(): void {

        let output: HTMLTextAreaElement = document.getElementsByTagName( "textarea" )[1];
        output.value = "";

        
        for ( let matrikel in studiHomoAssoc ) {  // for-in-Schleife initiiert �ber die Schl�ssel des assoziativen Arrays-- Besonderheit: Type-Annotation nicht erlaubt, ergibt sich aus der Interface-Definition
            let studi: Studi = studiHomoAssoc[matrikel];
            let line: string = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? "(M)" : "(F)";
            line += studi.studiengang + ": ";
            output.value += line + "\n";
        }

       
        console.group( "Simple Array" ); // zus�tzliche Konsolenausgaben 
        console.log( studiSimpleArray );
        console.groupEnd();

        console.group( "Associatives Array (Object)" );
        console.log( studiHomoAssoc );
        console.groupEnd();
    }

    //Funktion, um Studenten nach Matrikelnummer zu suchen
   
    function search( _event: Event ): void {  //Funktion search 


       
        let output: HTMLTextAreaElement = document.getElementsByTagName( "textarea" )[0];  //Auf erste Textarea zugreifen

        output.value = "";

        
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName( "input" ); //Zugriff auf Inputs

       
        let matrikel: string = inputs[6].value;  //Matrikel wird aufgerufen durch den 6. Input

       
        let studi: Studi = studiHomoAssoc[matrikel];  //Matrikelnummer wird gespeichert

        if ( studi ) { //wenn �bereinstimmung mit student
            
           
            let line: string = matrikel + ": ";  //�bereinstimmung mit Student
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? ", (M)" : ", (F)";
            line += studi.studiengang + ": ";
            output.value += line + "\n";
            
        
        } else { //also Keine �bereinstimmung mit Student
            alert( "Es wurde kein Student gefunden, bitte versuchen sie es noch einmal." );
        }
    }
    
    //Funktion sendDataToHost
        function sendDataToHost(method: string, data: any = undefined) { //Parameter method: string, data: any = undefined (Optionalparameter, muss nicht unbedingt angeben werden(Daten werden schon �bergeben))
        console.log("Sending data to host.."); //Ausgabe wenn Daten zum Server gesendet werden
        let xhr: XMLHttpRequest = new XMLHttpRequest(); //Variable xhr, XMLHttpRequest wird erstellt
        let dataString: string = JSON.stringify(data); //Dataobjekt wird in ein string umgewandelt, um zum Server gesendet zu werden
        
       
        //Neue Http Request wird ge�ffnet
        xhr.open("GET", address + method + "?method=" + method + "&data=" + encodeURIComponent(dataString), true);  //true= wird asynchron gearbeitet
        if (method == "addStudent") { //�berpr�fen welche Methode ausgef�hrt werden soll
            xhr.onload = function () {  //Sobald eine Antwort ankommt schreibe die Antwort in die Konsole
                console.log(xhr.responseText)
            }
        }
        else if (method == "refreshStudents") {
            xhr.onload = function () {
                console.log('Refreshing Students...'); //Sobald eine Antwort ankommt ersetze studiHomoAssoc mit der Antwort und f�hre die Methode refresh aus
                studiHomoAssoc = JSON.parse(xhr.responseText);  //�berschreibe studiHomoAssoc mit der Antwort
                refresh();
            }
        }
        
        //Sende Request zum Server
        
        xhr.send();
    }
}