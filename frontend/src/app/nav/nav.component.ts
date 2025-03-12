import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  email: string | null = null;

  ngOnInit() {
    this.email = localStorage.getItem('email'); // Holen der gespeicherten E-Mail
  }

  logout() {
    localStorage.removeItem('authToken');  // Token löschen
    localStorage.removeItem('userEmail');  // Benutzer-E-Mail löschen
    this.email = null; // UI aktualisieren
    console.log('User logged out.');

  }
}
