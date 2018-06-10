namespace L07_Interfaces {
    // Struktur des heterogenen assoziativen Arrays als Datensatz für eine studierende Person
    export interface Studi {
        name: string;
        firstname: string;
        matrikel: number;
        age: number;
        gender: boolean;
        studiengang: string;
    }
    
   

    // Struktur des homogenen assoziativen Arrays, bei dem ein Datensatz der Matrikelnummer zugeordnet ist
    
    //Export, damit die andere Datei vom anderen Bescheid weiß
    
    export interface Studis {
        
        //Matrieln werden abgespeichert, Datentyp sind nur Studenten, homogen, da nur ein Datentyp  da ist, assoziatives Array
        
         [matrikel: string]: Studi;
    }

    // Simples Array zum Speichern der Studi-Datensätze (nur zur Demonstration)
    export let studiSimpleArray: Studi[] = [];
    
    // Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
    export let studiHomoAssoc: Studis = {};
    
}