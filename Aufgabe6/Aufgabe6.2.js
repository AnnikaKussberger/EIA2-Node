var L06_Interfaces;
(function (L06_Interfaces) {
    window.addEventListener("load", init);
    let address = "https://eia2node257455.herokuapp.com/";
    function init(_event) {
        console.log("Init");
        let insertButton = document.getElementById("insert"); //Enventlistener auf Button �bergeben
        let searchButton = document.getElementById("search");
        let refreshButton = document.getElementById("refresh");
        let exampleButton = document.getElementById("exampleData"); //Button f�r drei Bespieldatens�tze
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refreshStudents); //Wenn geklickt wird wird refreshStudents ausgrf�hrt
        searchButton.addEventListener("click", search);
        exampleButton.addEventListener("click", exampleData);
    }
    function exampleData() {
        for (let i = 0; i < 3; i++) {
            let student = {
                name: "Nachname " + i,
                firstname: "Jeff" + i,
                matrikel: Math.floor(Math.random() * 222222),
                age: Math.floor(Math.random() * 22),
                gender: !!Math.round(Math.random()),
                studiengang: "OMB"
            };
            sendDataToHost("addStudent", student); //Funktion sendDataToHost, Variable student wird an sendDataToHost �bergeben
        }
    }
    function insert(_event) {
        let inputs = document.getElementsByTagName("input");
        let genderButton = document.getElementById("male");
        let matrikel = inputs[2].value;
        let studi;
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
        L06_Interfaces.studiHomoAssoc[matrikel] = studi; // Datensatz im assoziativen Array unter der Matrikelnummer speichern
        L06_Interfaces.studiSimpleArray.push(studi);
        sendDataToHost("addStudent", studi); //Funktion sendDataToHost, Objekt studi wird �bergeben, Methode addStudent 
    }
    //Serverfunktion refreshStudents wird ausgef�hrt
    //Funktion refreshStudents holt sich die Liste der ganzen Daten vom Server
    function refreshStudents(_event) {
        sendDataToHost("refreshStudents");
    }
    function refresh() {
        let output = document.getElementsByTagName("textarea")[1];
        output.value = "";
        for (let matrikel in L06_Interfaces.studiHomoAssoc) {
            let studi = L06_Interfaces.studiHomoAssoc[matrikel];
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? "(M)" : "(F)";
            line += studi.studiengang + ": ";
            output.value += line + "\n";
        }
        console.group("Simple Array"); // zus�tzliche Konsolenausgaben 
        console.log(L06_Interfaces.studiSimpleArray);
        console.groupEnd();
        console.group("Associatives Array (Object)");
        console.log(L06_Interfaces.studiHomoAssoc);
        console.groupEnd();
    }
    //Funktion, um Studenten nach Matrikelnummer zu suchen
    function search(_event) {
        let output = document.getElementsByTagName("textarea")[0]; //Auf erste Textarea zugreifen
        output.value = "";
        let inputs = document.getElementsByTagName("input"); //Zugriff auf Inputs
        let matrikel = inputs[6].value; //Matrikel wird aufgerufen durch den 6. Input
        let studi = L06_Interfaces.studiHomoAssoc[matrikel]; //Matrikelnummer wird gespeichert
        if (studi) {
            let line = matrikel + ": "; //�bereinstimmung mit Student
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
    function sendDataToHost(method, data = undefined) {
        console.log("Sending data to host.."); //Ausgabe wenn Daten zum Server gesendet werden
        let xhr = new XMLHttpRequest(); //Variable xhr, XMLHttpRequest wird erstellt
        let dataString = JSON.stringify(data); //Dataobjekt wird in ein string umgewandelt, um zum Server gesendet zu werden
        //Neue Http Request wird ge�ffnet
        xhr.open("GET", address + method + "?method=" + method + "&data=" + encodeURIComponent(dataString), true); //true= wird asynchron gearbeitet
        if (method == "addStudent") {
            xhr.onload = function () {
                console.log(xhr.responseText);
            };
        }
        else if (method == "refreshStudents") {
            xhr.onload = function () {
                console.log('Refreshing Students...'); //Sobald eine Antwort ankommt ersetze studiHomoAssoc mit der Antwort und f�hre die Methode refresh aus
                L06_Interfaces.studiHomoAssoc = JSON.parse(xhr.responseText); //�berschreibe studiHomoAssoc mit der Antwort
                refresh();
            };
        }
        //Sende Request zum Server
        xhr.send();
    }
})(L06_Interfaces || (L06_Interfaces = {}));
//# sourceMappingURL=Aufgabe6.2.js.map