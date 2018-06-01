namespace L06_Interfaces {
    
    export interface Studi { // Struktur des heterogenen assoziativen Arrays als Datensatz für Student
        name: string;
        firstname: string;
        matrikel: number;
        age: number;
        gender: boolean;
        studiengang: string;
    }
    
   

    // Struktur des homogenen assoziativen Arrays, bei dem ein Datensatz der Matrikelnummer zugeordnet ist
    
    export interface Studis {           //Export, damit die andere Dateien die Datensätze üübermittelt bekommen
        [matrikel: string]: Studi;      //Matriel werden als string abgespeichert, Datentyp sind nur Studenten, homogen, da nur ein Datentyp  da ist, assoziatives Array
    }

    
    export let studiSimpleArray: Studi[] = []; //Array zum Speichern der Studi-Datensätze
    export let studiHomoAssoc: Studis = {};    //Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
    
}