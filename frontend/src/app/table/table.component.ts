import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from '../shared/backend.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table', //gehört zu app-table
  standalone: true, //eigenständige komponente  
  imports: [CommonModule, RouterLink], //Common für ngOnit, ROuterLink für Navigation
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  members: any[] = []; //leeres Array vorerst zum Speichern der members

  constructor(private backendService: BackendService) {} //backendservice wird per dependency injection injectet

  //Methode erhält Daten aus Backend als JSON
  ngOnInit(): void {
    this.backendService.getAll() //bacjend.serice.ts. getAll() Methode, um alle Mitglieder zu erhalten
      .then(response => this.members = response)
      .catch(error => console.error('Error loading members:', error));
  }

  delete(forename: string): void {
    if (confirm(`Möchten Sie den User ${forename} wirklich löschen?`)) {
      this.backendService.delete(forename)
        .then(() => {
          this.members = this.members.filter(member => member.forename!== forename);
          console.log(`User mit dem Namen ${forename} wurde gelöscht.`);
        })
        .catch(error => console.error('Fehler beim Löschen:', error));
    }
  } 
  
}
