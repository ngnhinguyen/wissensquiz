import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-css-quiz',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './css-quiz.component.html',
  styleUrl: './css-quiz.component.css',
})
export class CssQuizComponent implements OnInit {
  questions: any[] = [];

  constructor(private backendService: BackendService) {}
  ngOnInit(): void {
    this.backendService.getQuestionsByCategory('CSS')
      .then(response => this.questions = response)
      .catch(error => console.error('Error loading CSS questions:', error));
  }
}
