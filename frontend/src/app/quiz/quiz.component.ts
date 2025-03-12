import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  questions = [
    {
      question: 'Was bedeutet HTML?',
      options: [
        'HyperText Markup Language',
        'High-Tech Machine Learning',
        'Hyper Transfer Meta Language',
        'HyperText Management Language',
      ],
      correctAnswer: 'HyperText Markup Language'
    },
    {
      question: 'Welches HTML-Element wird für Hyperlinks verwendet?',
      options: ['<link>', '<a>', '<href>', '<url>'],
      correctAnswer: '<a>'
    },
    {
      question: 'Was ist der Unterschied zwischen GET und POST in HTTP?',
      options: [
        'GET sendet Daten im Body, POST sendet Daten in der URL',
        'GET ist sicherer als POST',
        'GET überträgt Daten in der URL, POST im Body',
        'POST kann keine Daten an den Server senden',
      ],
      correctAnswer: 'GET überträgt Daten in der URL, POST im Body'
    },
    {
      question: 'Was gehört in den <head>-Bereich einer HTML-Seite?',
      options: [
        'Der sichtbare Inhalt der Webseite',
        'Metadaten, CSS-Links, Skripte',
        'Nur JavaScript-Dateien',
        'Tabellen und Formulare',
      ],
      correctAnswer: 'Metadaten, CSS-Links, Skripte'
    },
    {
      question: 'Welches dieser HTML-Elemente ist ein Inline-Element?',
      options: [
        '<p>',
        '<div>',
        '<span>',
        '<section>',
      ],
      correctAnswer: '<span>'
    }
  ];

  currentQuestionIndex = 0;
  totalQuestions = this.questions.length;
  selectedAnswer: string | null = null;
  correctAnswers = 0;
  progress: number = 0;
  timeLeft: number = 10;
  timer: any;
  totalTime: number = 0;
  quizCompleted: boolean = false;

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
        this.nextQuestion();
      }
    }, 1000);
  }

  selectAnswer(option: string) {
    if (!this.selectedAnswer) {
      this.selectedAnswer = option;
      if (option === this.questions[this.currentQuestionIndex].correctAnswer) {
        this.correctAnswers++;
      }
      clearInterval(this.timer);
    }
  }

  nextQuestion() {
    this.totalTime += 10 - this.timeLeft;
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
      this.progress = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
      this.timeLeft = 10;
      this.startTimer();
    } else {
      this.quizCompleted = true;
    }
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.progress = 0;
    this.totalTime = 0;
    this.quizCompleted = false;
    this.selectedAnswer = null;
    this.timeLeft = 10;
    this.startTimer();
  }
}
