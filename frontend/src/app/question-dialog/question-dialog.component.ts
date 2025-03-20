import { BackendService } from '../shared/backend.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Question } from '../../../../backend/question';

@Component({
  selector: 'app-question-dialog',
  imports: [CommonModule, MatDialogModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './question-dialog.component.html',
  styleUrl: './question-dialog.component.css'
})
export class QuestionDialogComponent implements OnInit {

  readonly backendService = inject(BackendService);
  readonly dialogRef = inject(MatDialogRef);
  readonly question: Question = inject(MAT_DIALOG_DATA).question;

  isCreating: boolean = false;
  questionForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.warn('Frage:', this.question);
    this.questionForm = this.fb.group({
      _id: [this.question?._id || ''],
      correctAnswer: [this.question?.correctAnswer || '', Validators.required],
      explanation: [this.question?.explanation || ''],
      options: this.fb.array([], Validators.required),
      question: [this.question?.question || '', Validators.required],
      category: [this.question?.category || '', Validators.required]
    });

    this.isCreating = !this.question;

    if (this.isCreating) {
      for (let i = 0; i < 4; i++) {
        this.addOption();
      }
    } else {
      this.question.options.forEach(opt => this.options.push(this.fb.control(opt)));
    }
  }

  saveQuestion(): void {
    if (this.isCreating) {
      this.createQuestion();
    } else {
      this.updateQuestion();
    }
  }

  createQuestion(): void {
    const formValue = this.questionForm.value;
    const questionPayload: Question = {
      _id: formValue._id,
      question: formValue.question,
      category: formValue.category,
      correctAnswer: formValue.correctAnswer,
      explanation: formValue.explanation,
      options: this.options.value
    };
  
    this.backendService.createQuestion(questionPayload)
      .then(newQuestion => {
        this.dialogRef.close(newQuestion);
      })
      .catch(error => console.error('Fehler beim Erstellen der Frage:', error));
  }
  

  updateQuestion(): void {
    const formValueAsPartial: Partial<Question> = this.questionForm.value;
    this.backendService.updateQuestion(this.question._id, formValueAsPartial)
      .then(updatedQuestion => {
        this.dialogRef.close(updatedQuestion);
      })
      .catch(error => console.error("Fehler beim Aktualisieren der Frage:", error));
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  addOption(): void {
    this.options.push(this.fb.control(''));
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}