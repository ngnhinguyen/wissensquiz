import { Injectable } from '@angular/core';
import { Member } from '../../../../backend/member';

//CRUD- Operationen: Create, Read, Update, Delete
//Benutzer Authentifizierung: Login, Logout
// JWT Token für künftige API Afrange, Token wird automatisch gespeichert

@Injectable({
  providedIn: 'root'
})

//Brücke/ Schnittstelle zwischen Frontend/Backend, wo Anfragen API erstellt wird mit verschiedenen HTTP Methoden (GET, POST, PUT aka updaten von daten, DELETE)
export class BackendService {

  apiURL = 'http://localhost:3002' //Backend Server URL, bei Fehler lsof -i :3002, kill 45452 (jeweiliger PID)


  constructor() { }

  // GET Anfrage an /mmembers, um alle Mitglieder zu erhalten
  //async, wenn Aufgabe länger braucht, als der Rest des Codes, wird asynchron ausgeführt
  //async und await, um Schritt für Schritt (synchron) zu arbeiten
  async getAll(): Promise<Member[]> { //Funktion gibt Promise zurück, dass in der Zukunft (später) eine Liste von Member Objekten enhtalten wird
    const response = await fetch(`${this.apiURL}/members`, { //Warte, bis fetch fertig ist, also stoppt kurz und wartet auf Antwort vom Server, sobald sie da ist, in response speichern //!!! ohne await läuft Code weiter, ohne dass die Daten bzw. Antwort da ist
      headers: this.getAuthHeaders() //autorisierungsinfos mit der anfrage mitsenden
    });
    if (!response.ok) { //falls response (antwort vom server, nachdem anfrage bearbeitet wurde) nicht ok, Fehlermeldung, z.B. wenn Server nicht erreichbar ist
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Gibt Promise zurück als JSON
    //const data = await response.json();
    //console.log('Geladene Mitglieder:', data); // Debugging   
    //return data;
  }

  // Methode sent eine GET Anfrage an API /members/:id, um ein Mitglied zu erhalten
  //sendet an Backend Server, um bestimmtes Mitglied zu erhalten (durch ID)
  async getOne(id: string): Promise<Member> {
    let response = await fetch(this.apiURL + '/members/' + id); //fetch() holt Daten aus Backcend (ruft API ENdpukt auf), ergänzt die API URL um id, um spezifisches Mitglied zu erhalten
    let member = await response.json(); //Umwandlung in JSON (JavaScript Objekt Notation)
    console.log('member in service (getOne) : ', member) //Debugging
    return member; //als json, sonst fehler 
  } // anschließend empfängt backend express.js die Anfrage und verarbeitet sie 

  //delete request 
  async delete (forename: string): Promise < void> {
  return fetch(`${this.apiURL}/members/${forename}`, {
    method: 'DELETE',
  }).then(res => {
    if (!res.ok) {
      throw new Error('Failed to delete member');
    }
  });
}
  async update(id: string, updateData: Member): Promise < Member > {
  let response = await fetch(this.apiURL + '/members/' + id, {
    method: "PUT", //vorhandene Ressource erstellen oder ersetzen
    body: JSON.stringify(updateData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let member = await response.json();
  console.log('member in service (update) : ', member)
    return member;
}
  async create(newData: Member): Promise < Member > {
  let response = await fetch(this.apiURL + '/members', {
    method: "POST", //neue Ressource erstellen
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let member = await response.json();
  console.log('member in service (create) : ', member)
    return member;
}

  async login(email: string, password: string): Promise < { token: string } > {
    let response = await fetch(`${this.apiURL}/login`, { //Login Anfrage wird gesendet (POST/logjn) siehe router.js
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
                },
      });

      if (!response.ok) {  // Falls falsche Anmeldeinformationen wird user nicht weitergeleitet
        const errorMessage = await response.text(); // Fehlertext abrufen
        throw new Error(`Login fehlgeschlagen: ${errorMessage}`);
    }

      let result = await response.json();
      console.log('Token received:', result.token);

      if(result.token) {
      localStorage.setItem('authToken', result.token); //wenn token erhalten, dann in localStorage speichern
      localStorage.setItem('email', email); //email auch speichern
      }
    return result;
  }

  //Cookies Authentifizierungstoken werden auch in Cookies gesendet (best practice in header, nicht in body)
  private getAuthHeaders(): Record < string, string > { //Token mit jeder Anfrage mitschicken
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: token } : {};
  }
  
logout(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('email');
  console.log('User logged out.');
}

}