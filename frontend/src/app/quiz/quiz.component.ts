import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { BackendService } from '../shared/backend.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MatIconModule } from '@angular/material/icon';
import { Question } from '../../../../backend/question';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, SidebarComponent, MatDialogModule, MatIconModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {

  questions: any[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private backendService: BackendService) { } //backendservice wird per dependency injection injectet


  createQuestion(): void {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      data: { question: null }
    }); 
  
    dialogRef.afterClosed().subscribe((newQuestion) => {
      if (newQuestion) {
        console.log('Neue Frage erstellt:', newQuestion);
        this.questions.push(newQuestion);
      }
    });
  }  

  deleteQuestion(question: Question): void {
    if (confirm(`Möchten Sie die Frage <"${question.question}"> wirklich löschen?`)) {
      this.backendService.deleteQuestion(question._id)
        .then(() => {
          this.questions = this.questions.filter(question => question._id!== question._id);
          console.log(`Frage "${question} "wurde gelöscht.`);
        })
        .catch(error => console.error('Fehler beim Löschen:', error));
    }
  } 
  ngOnInit(): void {
    this.backendService.getAllQuestions() //bacjend.serice.ts. getAll() Methode, um alle Mitglieder zu erhalten
      .then(response => this.questions = response)
      .catch(error => console.error('Error loading questions:', error));
  }


  updateQuestion(questionId: string): void {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      data: {
        question: this.questions.find(q => q._id === questionId),
      },
    });

    dialogRef.afterClosed().subscribe((updatedQuestion) => {
      if (updatedQuestion) {
        console.log('Frage aktualisiert:', updatedQuestion);
        // Aktualisiere die Liste der Fragen im UI
        const index = this.questions.findIndex(q => q._id === questionId);
        if (index !== -1) {
          this.questions[index] = updatedQuestion;
        }

      }
    });
  }
  

}

