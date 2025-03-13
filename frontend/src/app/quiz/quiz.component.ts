import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
    questions: any[] = [];
  
    constructor(private backendService: BackendService) {} //backendservice wird per dependency injection injectet

    ngOnInit(): void {
        this.backendService.getAllQuestions() //bacjend.serice.ts. getAll() Methode, um alle Mitglieder zu erhalten
        .then(response => this.questions = response)
        .catch(error => console.error('Error loading questions:', error));
  }
}
