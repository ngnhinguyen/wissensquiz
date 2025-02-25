import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from '../shared/backend.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  members: any[] = [];

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getAll()
      .then(response => this.members = response)
      .catch(error => console.error('Error loading members:', error));
  }

  delete(_id: string): void {
    if (confirm(`Möchten Sie den Eintrag mit der ID ${_id} wirklich löschen?`)) {
      this.backendService.delete(_id)
        .then(() => {
          this.members = this.members.filter(member => member._id !== _id);
          console.log(`Mitglied mit ID ${_id} wurde gelöscht.`);
        })
        .catch(error => console.error('Fehler beim Löschen:', error));
    }
  }  
  
}
