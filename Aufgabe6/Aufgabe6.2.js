var L06_Interfaces;
(function (L06_Interfaces) {
    window.addEventListener("load", init);
    let address = "https://eia2node257455.herokuapp.com/";
    function init(_event) {
        console.log("Init");
        //Enventlistener auf Button �bergeben
        let insertButton = document.getElementById("insert");
        let searchButton = document.getElementById("search");
        let refreshButton = document.getElementById("refresh");
        //Button f�r drei Bespieldatens�tze
        let exampleButton = document.getElementById("exampleData");
        insertButton.addEventListener("click", insert);
        //Wenn geklickt wird f�hre refreshStudents aus
        refreshButton.addEventListener("click", refreshStudents);
        searchButton.addEventListener("click", search);
        exampleButton.addEventListener("click", exampleData);
    }
    //Drei Datensatzbeispiele
    function exampleData() {
        for (let i = 0; i < 3; i++) {
            //Zugriff auf Interface
            let student = {
                name: "Nachname " + i,
                firstname: "Jeff" + i,
                matrikel: Math.floor(Math.random() * 222222),
                age: Math.floor(Math.random() * 22),
                gender: !!Math.round(Math.random()),
                studiengang: "OMB"
            };
            //Funktion sendDataToHost, Variable student wird �bergeben
            sendDataToHost("addStudent", student);
        }
    }
    //Funktion um Daten der Studenten zu speichern
    function insert(_event) {
        let inputs = document.getElementsByTagName("input");
        let genderButton = document.getElementById("male");
        let matrikel = inputs[2].value;
        let studi;
        //Interface �bergeben
        studi = {
            name: inputs[0].value,
            firstname: inputs[1].value,
            matrikel: parseInt(matrikel),
            age: parseInt(inputs[3].value),
            gender: genderButton.checked,
            studiengang: document.getElementsByTagName("select").item(0).value,
        };
        console.log(studi);
        console.log(studi.age);
        console.log(studi["age"]);
        // Datensatz im assoziativen Array unter der Matrikelnummer speichern
        L06_Interfaces.studiHomoAssoc[matrikel] = studi;
        // nur um das auch noch zu zeigen...
        L06_Interfaces.studiSimpleArray.push(studi);
        //Funktion sendDataToHost, Objekt studi wird �bergeben
        //Methode addStudent
        sendDataToHost("addStudent", studi);
    }
    //Serverfunktion refreshStudents wird ausgef�hrt
    //Funktion refreshStudents holt sich die Liste der ganzen Daten vom Server
    //Methode refreshStudents
    function refreshStudents(_event) {
        sendDataToHost("refreshStudents");
    }
    function refresh() {
        let output = document.getElementsByTagName("textarea")[1];
        output.value = "";
        // for-in-Schleife iteriert �ber die Schl�ssel des assoziativen Arrays
        for (let matrikel in L06_Interfaces.studiHomoAssoc) {
            let studi = L06_Interfaces.studiHomoAssoc[matrikel];
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? "(M)" : "(F)";
            line += studi.studiengang + ": ";
            output.value += line + "\n";
        }
        // zus�tzliche Konsolenausgaben zur Demonstration
        console.group("Simple Array");
        console.log(L06_Interfaces.studiSimpleArray);
        console.groupEnd();
        console.group("Associatives Array (Object)");
        console.log(L06_Interfaces.studiHomoAssoc);
        console.groupEnd();
    }
    //Funktion, um Studenten nach Matrikelnummer zu suchen
    //Funktion search aufstellen
    function search(_event) {
        //Auf erste Textarea zugreifen
        let output = document.getElementsByTagName("textarea")[0];
        output.value = "";
        //Zugriff auf Inputs
        let inputs = document.getElementsByTagName("input");
        //Matrikel wird aufgerufen durch den 6. Input
        let matrikel = inputs[6].value;
        //Matrikelnummer wird gespeichert
        let studi = L06_Interfaces.studiHomoAssoc[matrikel];
        if (studi) {
            //�bereinstimmung mit Student
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? ", (M)" : ", (F)";
            line += studi.studiengang + ": ";
            output.value += line + "\n";
        }
        else {
            alert("Es wurde kein Student gefunden, bitte versuchen sie es noch einmal.");
        }
    }
    //Funktion sendDataToHost
    //Parameter method: string, data: any = undefined
    //data: any = undefined -> Optionalparameter, muss nicht unbedingt angeben werden(Daten werden schon �bergeben)
    function sendDataToHost(method, data = undefined) {
        //Ausgabe wenn Daten zum Server gesendet werden
        console.log("Sending data to host..");
        //Variable xhr, XMLHttpRequest wird erstellt
        let xhr = new XMLHttpRequest();
        //Dataobjekt wird in ein string umgewandelt, damit es zum Server gesendet werden kann
        let dataString = JSON.stringify(data);
        //true= asynchron
        //Neue Http Request wird ge�ffnet
        xhr.open("GET", address + method + "?method=" + method + "&data=" + encodeURIComponent(dataString), true);
        //�berpr�fen welche Methode ausgef�hrt werden soll
        if (method == "addStudent") {
            //Sobald eine Antwort ankommt schreibe die Antwort in die Konsole
            xhr.onload = function () {
                console.log(xhr.responseText);
            };
        }
        else if (method == "refreshStudents") {
            xhr.onload = function () {
                //Sobald eine Antwort ankommt ersetze studiHomoAssoc mit der Antwort und f�hre die Methode refresh aus
                console.log('Refreshing Students...');
                //�berschreibe studiHomoAssoc mit der Antwort
                L06_Interfaces.studiHomoAssoc = JSON.parse(xhr.responseText);
                refresh();
            };
        }
        //Sende Request zum Server
        xhr.send();
    }
})(L06_Interfaces || (L06_Interfaces = {}));
//# sourceMappingURL=Aufgabe6.2.js.map