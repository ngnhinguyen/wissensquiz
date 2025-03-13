import { Component , OnInit} from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'app-html-quiz',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './html-quiz.component.html',
  styleUrl: './html-quiz.component.css'
})
export class HtmlQuizComponent implements OnInit {
  questions: any[] = [];

  constructor(private backendService: BackendService) {}
  ngOnInit(): void {
    this.backendService.getQuestionsByCategory('HTML')
      .then(response => this.questions = response)
      .catch(error => console.error('Error loading HTML questions:', error));
  }
}

